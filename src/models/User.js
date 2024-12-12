
import Sequelize, { Model, DataTypes } from 'sequelize';  

import db from '../lib/db.js';

class User extends Model { }

const model = User.init({
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
}, {
    sequelize: db,
    indexes: [
        {
            unique: true,
            fields: ['Email'],
        },
    ]
});

export default model;