
import path from 'path';

import bodyParser from 'body-parser'; // Імпорт модуля body-parser для парсингу JSON-запитів
import getRandomInt from '../helpers/random-numbers.js'; // Імпорт функції для генерації випадкових чисел

import router from '../router/index.js'

const __dirname = path.resolve();

// Роут для головної сторінки
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html'); // Встановлення заголовка Content-Type
    res.send(`Hello World YAY <br> From express <br> <a href="/page">${getRandomInt(1, 100)}</a>`); // Відправка відповіді з випадковим числом
});

router.get('/page', (req, res) => {
    const pathToResourses = `${__dirname}/resourses/`;
    res.sendFile(pathToResourses, 'index.html');
});

// Роут для користувача за ID
router.get('/user/:id', function (req, res) {
    const userId = req.params.id; // Отримання ID користувача з параметрів запиту
    res.send(`hello, user! ${userId}`); // Відправка відповіді з ID користувача
});

// Роут для створення нового користувача
router.post('/user', bodyParser.json(), function (req, res) {
    const newUser = req.body; // Отримання даних нового користувача з тіла запиту
    const userData = JSON.stringify(newUser); // Перетворення даних користувача у JSON-рядок
    res.send(`New, user created! ${userData}`); // Відправка відповіді з даними нового користувача
});
export default router;