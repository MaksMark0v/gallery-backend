
// Імпорт бібліотеки express-jwt для роботи з JWT (JSON Web Tokens)
import { expressjwt } from 'express-jwt';

// Імпорт бібліотеки dotenv для роботи з змінними середовища
import dotenv from 'dotenv'; 

// Завантаження змінних середовища з файлу .env
dotenv.config(); 

// Створення middleware для аутентифікації за допомогою JWT
const jwtAuth = expressjwt({
  // Секретний ключ для підписування та перевірки JWT, завантажується зі змінних середовища
  secret: process.env.JWT_SECRET_KEY,
  // Аудиторія, яка може використовувати цей токен, завантажується зі змінних середовища
  audience: process.env.JWT_AUDIENCE,
  // Емітент токену, завантажується зі змінних середовища
  issuer: process.env.JWT_ISSUER,
  // Алгоритми, які використовуються для підписування JWT
  algorithms: ["HS256"],
  // Час життя токену, завантажується зі змінних середовища
  expiresIn: process.env.JWT_LIFETIME
});

// Middleware для перевірки наявності кукі 'x-gallery-session'
// const auth = function (req, res, next) {
//   const authValue = req.cookies['x-gallery-session']; // Отримання кукі 'x-gallery-session'
//   if (authValue !== '1111') {
//     // Перевірка значення кукі (if (isNaN(authValue)) { // Перевірка, чи значення не є числом)
//     return next('router'); // Якщо значення не збігається, переходимо до наступного роутера
//   }
//   next(); // Якщо значення збігається, продовжуємо виконання
// };
export default jwtAuth;
