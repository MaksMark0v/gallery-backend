import Sequelize, { Model, DataTypes } from 'sequelize';

// Імпорт бази даних
import db from '../lib/db.js';
import User from './User.js';
import Picture from './Picture.js';

// Оголошення класу Gallery, що наслідує від Model
class Gallery extends Model {}

// Ініціалізація моделі Gallery
const model = Gallery.init(
  {
    Id: {
      type: DataTypes.BIGINT, // Тип даних: велике ціле число
      allowNull: false, // Поле не може бути null
      primaryKey: true, // Це первинний ключ
      autoIncrement: true // Автоматичне збільшення значення
    },
    UserId: {
      type: DataTypes.BIGINT, // Тип даних: велике ціле число
      allowNull: false // Поле не може бути null
    },
    Name: {
      type: DataTypes.STRING(255), // Тип даних: рядок до 255 символів
      allowNull: false // Поле не може бути null
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE, // Тип даних: дата
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Значення за замовчуванням - поточний час
      allowNull: false // Поле не може бути null
    },
    UpdatedAt: {
      type: DataTypes.DATE, // Тип даних: дата
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Значення за замовчуванням - поточний час
      allowNull: false // Поле не може бути null
    },
    DeletedAt: {
      type: DataTypes.DATE, // Тип даних: дата
      allowNull: true // Поле може бути null (для м'якого видалення)
    }
  },
  {
    sequelize: db // Вказуємо, що модель використовує підключення до бази даних
  }
);

// Встановлення зв'язків між моделями
model.belongsTo(User); // Модель Gallery належить одному користувачу
User.hasMany(model); // Один користувач може мати багато галерей

model.hasMany(Picture, { foreignKey: 'GalleryId' }); // Модель Gallery може мати багато зображень
Picture.belongsTo(model, { foreignKey: 'GalleryId' }); // Кожне зображення належить одній галереї

// Експорт моделі
export default model;