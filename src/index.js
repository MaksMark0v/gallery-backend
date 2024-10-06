import path from 'path';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import getRandomInt from './helpers/random-numbers.js';

const __dirname = path.resolve();

const app = express();
const API_PORT = 5002;
const router = express.Router();

router.use(function (req, res, next) {
    if (!req.headers['x-auth']) return res.sendStatus(403)
    next()
});

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(`Hello World YAY\nFrom express\n${getRandomInt(1, 100)}`);
});

router.get('/page', (req, res) => {
    const pathToResourses = `${__dirname}/resourses/`;
    res.sendFile(pathToResourses, 'index.html');
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

app.use(router);

app.disable("x-powered-by");
app.use(helmet({
    xPoweredBy: false,
}));

app.listen(API_PORT, () => {
    console.log(`Server running at http://localhost:${API_PORT}/`)
});

