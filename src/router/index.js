import express from 'express';
import getRandomInt from '../helpers/random-numbers.js'; // Імпорт функції для генерації випадкових чисел

const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html'); // Встановлення заголовка Content-Type
  res.send(
    `Hello World YAY <br> From express <br> <a href="/user">${getRandomInt(1, 100)}</a>`
  ); // Відправка відповіді з випадковим числом
});

export default router;
