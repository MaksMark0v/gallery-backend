import bodyParser from 'body-parser';

import { getUsersData, getUserDetails, saveUser } from '../repository/userRepo.js';

import router from '../router/index.js';

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
