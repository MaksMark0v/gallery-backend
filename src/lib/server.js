import express from 'express'; // Імпорт фреймворку Express для створення веб-серверу
import helmet from 'helmet'; // Імпорт модуля helmet для підвищення безпеки додатку
import cookieParser from 'cookie-parser'; // Імпорт модуля cookie-parser для роботи з кукі

import authController from '../controllers/authController.js';
import userController from '../controllers/userController.js';
import galleryController from '../controllers/galleryController.js';
import pictureController from '../controllers/pictureController.js';

// Імпортуємо функцію runMigrations з модуля migration.js,
// яка, ймовірно, відповідає за виконання міграцій бази даних.
import { runMigrations } from './migration.js';

// Імпортуємо за замовчуванням екземпляр підключення до бази даних (sequelize)
// з модуля db.js, а також названий експорт isDbConnectionInited,
// який, можливо, є булевою змінною або функцією, що вказує на те,
// чи було ініціалізовано підключення до бази даних.
import sequelize, { isDbConnectionInited } from './db.js';


const API_PORT = 5002; // Визначення порту для сервера
export async function createServer(){
  const app = express(); // Створення екземпляру Express
  
  app.use(cookieParser());
  app.use(express.json()); // Використання middleware для роботи з JSON
  
  app.use(userController); // Використання роутера у додатку
  app.use(galleryController);
  app.use(pictureController);
  app.use(authController); // Використання роутера для авторизаці��

  // Відловлює помилки авторизаці�� та віддає повідомлення про помилку
  app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.setHeader('Content-Type', 'text/json');
      res.status(401).send({ message: `Authorization error: ${err.message}` });
    } else {
      next(err);
    }
  });

  app.disable('x-powered-by'); // Вимкнення заголовка 'x-powered-by' для підвищення безпеки
  app.use(
    helmet({
      xPoweredBy: false // Вимкнення заголовка 'x-powered-by' за допомогою helmet
    })
  );
 // Перевіряємо, чи ініціалізовано з'єднання з базою даних
if (isDbConnectionInited) {
  // Якщо з'єднання ініціалізовано, виконуємо міграції бази даних
  await runMigrations(sequelize);
  }
  
  app.listen(API_PORT, () => {
    console.log(`Server running at port ${API_PORT}`); // Запуск сервера на визначеному порту
  });
}

