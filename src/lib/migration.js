import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import sequelize from 'sequelize';
import Migration from '../models/_Migration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function runMigrations(db) {
    const migrationsPath = path.join(__dirname, '..', 'migrations');

    const queryInterface = db.getQueryInterface();
    await queryInterface.createTable('_migrations', {
        Name: sequelize.DataTypes.STRING,
        AppliedAt: {
            type: sequelize.DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });

    console.log(`Scan folder "${migrationsPath}" for migrations`);

    const list = await readDir(migrationsPath);
    const migrations = await Migration.findAll();

    for (const file of list) {
        if (!file.match(/\.js$/)) {
            continue;
        }
        const appliedMigration = migrations.find((migration) => migration.Name === file);
        if (appliedMigration) {
            console.log(`Migration "${file}" already applied at ${appliedMigration.AppliedAt}`);
            continue;
        }
        console.log(`Migration "${file}" applying...`, { scope: 'migrations' });

        const filePath = new URL(`file://${path.join(migrationsPath, file)}`);
        const { up, down } = await import(filePath);

        if (!up || !down) {
            throw new Error(`Invalid migration functions in file ${file}`);
        }
        await up(queryInterface, sequelize);

        const item = new Migration({
            Name: file,
            AppliedAt: new Date()
        });
        await item.save();
    }

    function readDir(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (errDir, files) => {
                if (errDir) {
                    return reject(errDir);
                }
                return resolve(files);
            });
        });
    }
}

export async function revertMigration(db, name) {
    const migrationFile = path.join(__dirname, '..', 'migrations', name);

    console.log(`Reverting "${migrationFile}"...`, { scope: 'migrations' });

    const migration = await Migration.findOne({
        where: { Name: name }
    });
    if (!migration) {
        throw new Error(`Migration "${name}" not applied`);
    }

    const filePath = new URL(`file://${migrationFile}`);
    const { up, down } = await import(filePath);

    if (!up || !down) {
        throw new Error(`Invalid migration functions in file ${migrationFile}`);
    }
    await down(db.getQueryInterface(), sequelize);
    await migration.destroy();
}
