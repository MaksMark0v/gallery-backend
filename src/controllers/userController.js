import bodyParser from 'body-parser';
import getRandomInt from '../helpers/random-numbers.js';

import router from '../router/index.js';

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`Hello World YAY\nFrom express\n${getRandomInt(1, 100)}`);
  });
  
  router.get('/user/:id', function (req, res) {
    const userId = req.params.id;
    res.send(`hello, user! ${userId}`)
  });
  
  router.post('/user', bodyParser.json(),  function (req, res) {
    const newUser = req.body;
    const userData = JSON.stringify(newUser);
    res.send(`New, user created! ${userData}`)
  });

export default router;