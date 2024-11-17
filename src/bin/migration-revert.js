import 'regenerator-runtime/runtime.js';

import db, { initDatatbaseConnection } from '../lib/db.js';
import { revertMigration } from '../lib/migration.js';

(async function bootstrap() {
  try {
    process.on('uncaughtException', (err) => {
      console.error(err);
    });

    await initDatatbaseConnection();

    const [,, migrationName] = process.argv;
    
    await revertMigration(db, migrationName);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}());