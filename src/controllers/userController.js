// import path from 'path'; // Імпорт модуля path для роботи з файловими шляхами (закоментовано)
import getRandomInt from '../helpers/random-numbers.js'; // Імпорт функції для генерації випадкових чисел
import router from '../router/index.js'; // Імпорт роутера
import { getUsersData, getUserDetails, saveUser, deleteUser } from '../reposetory/userRepo.js'; // Імпорт функцій для роботи з даними користувачів
import bodyParser from 'body-parser'; // Імпорт модуля body-parser для парсингу JSON-запитів

// const __dirname = path.resolve(); // Визначення абсолютного шляху до кореневої директорії (закоментовано)

// Роут для головної сторінки
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html'); // Встановлення заголовка Content-Type
  res.send(`Hello World YAY <br> From express <br> <a href="/user">${getRandomInt(1, 100)}</a>`); // Відправка відповіді з випадковим числом
});

// router.get('/page', (req, res) => {
//   const pathToResourses = `${__dirname}/resourses/`;
//   res.sendFile(pathToResourses, 'index.html');
// });

// Роут для отримання даних користувачів
router.get('/user', async (req, res) => {
  try {
    const usersData = await getUsersData(req.query); // Отримання даних користувачів з запиту
    res.send(usersData); // Відправка даних користувачів у відповіді
  } catch (error) {
    console.error(error); // Логування помилки
    res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з помилкою
  }
});

// Роут для отримання даних конкретного користувача за ID
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id; // Отримання ID користувача з параметрів запиту
  console.log(1, userId); // Логування ID користувача для дебагінгу
  try {
    const usersDetails = await getUserDetails(userId); // Отримання деталей користувача за ID
    res.send(usersDetails); // Відправка деталей користувача у відповіді
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з помилкою
  }
});

// Роут для створення нового користувача
router.post('/user', bodyParser.json(), async (req, res) => {
  const newUser = req.body; // Отримання даних нового користувача з тіла запиту
  try {
    const Id = await saveUser(newUser); // Збереження нового користувача
    res.send({ Id }); // Відправка ID нового користувача у відповіді
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з помилкою
  }
});

// Роут для оновлення даних користувача за ID
router.put('/user/:id', bodyParser.json(), async (req, res) => {
  const userData = req.body; // Отримання даних користувача з тіла запиту
  try {
    const Id = await saveUser(userData, req.params.id); // Оновлення даних користувача за ID
    res.send({ Id }); // Відправка ID оновленого користувача у відповіді
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з помилкою
  }
});

// Роут для видалення користувача за ID
router.delete('/user/:id', async (req, res) => {
  try {
    const Id = await deleteUser(req.params.id); // Видалення користувача за ID
    if (!Id){
    res.status(404).send('User not found');
  }; // Відправка ID видаленого користувача у відповіді
  res.status(204).end();
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з помилкою
  }
  
});

export default router; // Експорт роутера за замовчуванням
