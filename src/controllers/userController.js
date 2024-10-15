import bodyParser from 'body-parser';
import getRandomInt from '../helpers/random-numbers.js';

import { getUsersData, getUserDetails } from '../repository/userRepo.js';

import router from '../router/index.js';

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`Hello World YAY\nFrom express\n${getRandomInt(1, 100)}`);
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

router.get('/user/:id',  async (req, res) => {
  const userId = req.params.id;
  try {
    const usersDetails = await getUserDetails(userId);
    res.send(usersDetails);
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

router.post('/user', bodyParser.json(), function (req, res) {
  const newUser = req.body;
  const userData = JSON.stringify(newUser);
  res.send(`New, user created! ${userData}`);
});

export default router;
