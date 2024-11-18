// Імпортуємо необхідні бібліотеки
import { Sequelize } from 'sequelize'; // Імпорт класу Sequelize для роботи з базою даних
import dotenv from 'dotenv'; // Імпорт бібліотеки dotenv для роботи зі змінними середовища

// Завантажуємо змінні середовища з файлу .env
dotenv.config();

// Експортуємо змінну isDbConnectionInited, яка вказує на стан ініціалізації з'єднання з базою даних.
// Ініціалізуємо її значенням false, що означає, що на момент оголошення з'єднання ще не було ініціалізовано.
// Цю змінну можна імпортувати в інших модулях для перевірки, чи було успішно встановлено з'єднання з базою даних.
export let isDbConnectionInited = false;

// Створюємо новий екземпляр Sequelize для підключення до бази даних
const sequelize = new Sequelize({
    logging: console.log, // Налаштовуємо логування SQL запитів у консоль

    // Конфігурація підключення до бази даних
    dialect: process.env.DB_DIALIECT, // Тип бази даних (MySQL, PostgreSQL тощо)
    port: +process.env.DB_PORT, // Номер порту для з'єднання (перетворюємо на число)
    host: process.env.DB_HOSTNAME, // Ім'я хоста бази даних
    username: process.env.DB_USERNAME, // Ім'я користувача для підключення
    password: `${process.env.DB_PASSWORD}`, // Пароль для підключення (можна без `${}`)
    database: process.env.DB_DATABASE, // Назва бази даних

    define: {
        timestamps: false // Встановлює, що модель не буде автоматично додавати поля для зберігання часу
        //  створення (createdAt) та часу останнього оновлення (updatedAt). Це може бути корисно, якщо вам 
        // не потрібно відстежувати ці дати для даної моделі або якщо логіка вашого застосунку обробляє часові мітки іншим чином.
    },
    timezone: '+00:00' // Часовий пояс для з'єднання
});


// Функція для ініціалізації з'єднання з базою даних
export async function initDatatbaseConnection() {
    try {
        // Спробуємо автентифікувати з'єднання
        await sequelize.authenticate();
        console.log('Connection has been established successfully.'); // Повідомлення про успішне з'єднання
        isDbConnectionInited = true; // Встановлюємо значення змінної isDbConnection
    } catch (error) {
        // Ловимо помилку, якщо з'єднання не вдалося
        console.error('Unable to connect to the database:', error); // Виводимо повідомлення про помилку
    }
}

// Експортуємо екземпляр sequelize для використання в інших модулях
export default sequelize;