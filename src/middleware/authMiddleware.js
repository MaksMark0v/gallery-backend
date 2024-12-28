import { expressjwt } from 'express-jwt';

import dotenv from 'dotenv';
import { getUserId } from '../repository/authRepo.js';

dotenv.config();

// Створення middleware для аутентифікації за допомогою JWT
// const jwtAuth = expressjwt({
//   // Секретний ключ для підписування та перевірки JWT, завантажується зі змінних середовища
//   secret: process.env.JWT_SECRET_KEY,
//   // Аудиторія, яка може використовувати цей токен, завантажується зі змінних середовища
//   audience: process.env.JWT_AUDIENCE,
//   // Емітент токену, завантажується зі змінних середовища
//   issuer: process.env.JWT_ISSUER,
//   // Алгоритми, які використовуються для підписування JWT
//   algorithms: ['HS256'],
//   // Час життя токену, завантажується зі змінних середовища
//   expiresIn: process.env.JWT_LIFETIME
// });

// Middleware для перевірки наявності кукі 'x-gallery-session'
// const auth = function (req, res, next) {
//   const authValue = req.cookies['x-gallery-session']; // Отримання кукі 'x-gallery-session'
//   if (authValue !== '1111') {
//     // Перевірка значення кукі (if (isNaN(authValue)) { // Перевірка, чи значення не є числом)
//     return next('router'); // Якщо значення не збігається, переходимо до наступного роутера
//   }
//   next(); // Якщо значення збігається, продовжуємо виконання
// };
// export default jwtAuth;

const jwtAuth = [
  expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithms: ['HS256'],
    expiresIn: process.env.JWT_LIFETIME
  }),

  async (req, res, next) => {
    try {
      const email = req.auth?.Email;

      if (!email) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: Wrong token payload' });
      }

      const id = await getUserId(email);
      req.auth.userId = id;
      next();
    } catch (error) {
      console.error('Error in jwtAuth middleware:', error);
      if (error.message === 'User not found')
        res.status(401).json({ message: 'Unauthorized: User not found' });

      next(error);
    }
  }
];

export default jwtAuth;
