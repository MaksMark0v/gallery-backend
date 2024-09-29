import http from 'http';
import getRandomInt from './helpers/random-numbers';

const server = http.createServer ((req, res) =>{
    const randomNumber = getRandomInt(1, 100);
    res.writeHead (200, { 'Content-Type': 'text/plain' });
    res.end(`Hello World!\nFrom nodejs\n${randomNumber}`);
});

server.listen(5002, () => {
    console.log('Server is running at http://localhost:5002/');
});
