import path from 'path';

import getRandomInt from '../helpers/random-numbers.js'; // Імпорт функції для генерації випадкових чисел

import router from '../router/index.js';
import { getUsersData } from '../reposetory/userRepo.js';

const __dirname = path.resolve();

// Роут для головної сторінки
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html'); // Встановлення заголовка Content-Type
  res.send(
    `Hello World YAY <br> From express <br> <a href="/user">${getRandomInt(1, 100)}</a>`
  ); // Відправка відповіді з випадковим числом
});

router.get('/page', (req, res) => {
  const pathToResourses = `${__dirname}/resourses/`;
  res.sendFile(pathToResourses, 'index.html');
});

router.get('/user', async (req, res) => {
  try {
    const usersData = await getUsersData(req.query);
    res.send(usersData);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

// Роут для користувача за ID
router.get('/user/:id', function (req, res) {
  const userId = req.params.id; // Отримання ID користувача з параметрів запиту
  res.send(`hello, user! ${userId}`); // Відправка відповіді з ID користувача
});

export default router;
