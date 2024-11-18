// Імпортуємо бібліотеку Sequelize та клас Model з неї
import Sequelize, { Model } from 'sequelize';
// Імпортуємо екземпляр підключення до бази даних з локального модуля
import db from '../lib/db.js';

// Оголошуємо новий клас Migration, який наслідує від класу Model
class Migration extends Model {
}

// Ініціалізуємо модель, визначаючи її атрибути та конфігурацію
const model = Migration.init({
    // Визначаємо атрибут Name
    Name: {
        // Тип даних - рядок
        type: Sequelize.STRING,
        // Вказуємо, що цей атрибут є первинним ключем
        primaryKey: true
    },
    // Визначаємо атрибут AppliedAt
    AppliedAt: { 
        // Тип даних - дата
        type: Sequelize.DATE
    }
}, {
    // Передаємо екземпляр Sequelize, який буде використовуватися для цієї моделі
    sequelize: db,
    // Вказуємо назву таблиці в базі даних
    tableName: '_migrations'
});

// Експортуємо модель як стандартний експорт модуля
export default model;