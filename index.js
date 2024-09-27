import http from 'http';
import getRandomInt from './helpers/random-numbers.js';

const server = http.createServer((req, res) => {
  const randomNumber = getRandomInt(1, 100);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello World YAY\nFrom nodejs\n${randomNumber}`);
});

server.listen(5001, () => {
    console.log('Server running at http://localhost:5001/');
});