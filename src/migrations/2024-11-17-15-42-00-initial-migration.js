
import Sequelize, { DataTypes } from 'sequelize';
export async function up(queryInterface) {
    await queryInterface.createTable('Users', {
        Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        FirstName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        Middlename: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        LastName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        IsAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        PasswordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PasswordSalt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        DeletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
});
    await queryInterface.createTable('Galleries', {
        Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        DeletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
    await queryInterface.createTable('Pictures', {
        Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        GalleryId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        URL: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        DeletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
}
export async function down(queryInterface) {
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Galleries');
    await queryInterface.dropTable('Pictures');
}