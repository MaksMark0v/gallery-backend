
import Sequelize, { Model, DataTypes } from 'sequelize';

import db from '../lib/db.js';

class Picture extends Model {}

const model = Picture.init({
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
}, {
    sequelize: db
});

export default model;