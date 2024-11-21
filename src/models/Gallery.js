import Sequelize, { Model, DataTypes } from 'sequelize';

import db from '../lib/db.js';
import User from './User.js';
import Picture from './Picture.js'

class Gallery extends Model {}

const model =  Gallery.init({
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
}, {
    sequelize: db
});

model.belongsTo(User);
User.hasMany(model);

model.hasMany(Picture);
Picture.belongsTo(model);

export default model;