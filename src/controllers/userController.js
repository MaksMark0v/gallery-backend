// import path from 'path';

import getRandomInt from '../helpers/random-numbers.js'; // Імпорт функції для генерації випадкових чисел

import router from '../router/index.js';

import { getUsersData, getUserDetails, saveUser } from '../reposetory/userRepo.js';
import bodyParser from 'body-parser';

// const __dirname = path.resolve();

// Роут для головної сторінки
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html'); // Встановлення заголовка Content-Type
  res.send(
    `Hello World YAY <br> From express <br> <a href="/user">${getRandomInt(1, 100)}</a>`
  ); // Відправка відповіді з випадковим числом
});

// router.get('/page', (req, res) => {
//   const pathToResourses = `${__dirname}/resourses/`;
//   res.sendFile(pathToResourses, 'index.html');
// });

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
router.get('/user/:id',  async (req, res) => {
  const userId = req.params.id; // Отримання ID користувача з параметрів запиту
  console.log(1, userId);
  try {
    const usersDetails = await getUserDetails(userId);
    res.send(usersDetails);
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

  router.post('/user', bodyParser.json(), async (req, res) => {
    const newUser = req.body;
    const userData = JSON.stringify(newUser);
    try {
      const Id = await saveUser(userData);
      res.send({ Id });
    } catch (error) {
      res.status(500).send(`Internal server error: ${error.message}`);
    }
  });

  router.put('/user/:id', bodyParser.json(), async (req, res) => {
    const newUser = req.body;
    const userData = JSON.stringify(newUser);
    try {
      const Id = await saveUser(userData, req.params.id);
      res.send({ Id });
    } catch (error) {
      res.status(500).send(`Internal server error: ${error.message}`);
    }
  });


export default router;
