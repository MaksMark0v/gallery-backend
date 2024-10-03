// import express from 'express'; // Імпортуємо фреймворк Express.js для створення веб-сервера
// import path from 'path'; // Імпортуємо модуль path для роботи з шляхами до файлів
// import { fileURLToPath } from 'url'; // Імпортуємо функцію fileURLToPath з модуля url для перетворення URL в шлях файлу
// import getRandomInt from './helpers/random-numbers.js'; // Імпортуємо функцію для генерації випадкових чисел

// // Отримуємо повний шлях до поточного файлу
// const __filename = fileURLToPath(import.meta.url);
// // Отримуємо директорію поточного файлу
// const __dirname = path.dirname(__filename);

// const app = express(); // Створюємо екземпляр додатку Express
// const API_PORT = 5002; // Встановлюємо порт, на якому буде працювати сервер

// // Визначаємо маршрут для кореневого URL ('/')
// app.get('/', (req, res) => {
//     const randomNumber = getRandomInt(1, 100); // Генеруємо випадкове число від 1 до 100
//     res.send(`Hello World!\nFrom express\n${randomNumber}`); // Відправляємо відповідь з текстом та випадковим числом
// });

// // Визначаємо маршрут для URL '/page'
// app.get('/page', (req, res) => {
//     res.sendFile(path.join(__dirname, 'resourses', 'index.html')); // Відправляємо HTML-файл як відповідь
// });

// // Запускаємо сервер на вказаному порту
// app.listen(API_PORT, () => {
//     console.log(`Server running at http://localhost:${API_PORT}/`); // Виводимо повідомлення в консоль, що сервер запущено
// });
