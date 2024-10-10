import express from 'express'; // Імпорт фреймворку Express для створення веб-серверу
import helmet from 'helmet'; // Імпорт модуля helmet для підвищення безпеки додатку
import cookieParser from 'cookie-parser'; // Імпорт модуля cookie-parser для роботи з кукі

import userController from '../src/controllers/userController.js'


const app = express(); // Створення екземпляру Express
const API_PORT = 5002; // Визначення порту для сервера
app.use(cookieParser());

app.use(userController); // Використання роутера у додатку

app.disable("x-powered-by"); // Вимкнення заголовка 'x-powered-by' для підвищення безпеки
app.use(helmet({
    xPoweredBy: false, // Вимкнення заголовка 'x-powered-by' за допомогою helmet
}));

app.listen(API_PORT, () => {
    console.log(`Server running at http://localhost:${API_PORT}/`); // Запуск сервера на визначеному порту
});
