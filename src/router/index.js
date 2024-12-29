import express from 'express';
import getRandomInt from '../helpers/random-numbers.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(
    `Hello World YAY <br> From express <br> <a href="/user">${getRandomInt(1, 100)}</a>`
  );
});

export default router;
