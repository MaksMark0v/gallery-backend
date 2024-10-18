// Middleware для перевірки наявності кукі 'x-gallery-session'
const auth = function (req, res, next) {
  const authValue = req.cookies['x-gallery-session']; // Отримання кукі 'x-gallery-session'
  if (authValue !== '1111') {
    // Перевірка значення кукі (if (isNaN(authValue)) { // Перевірка, чи значення не є числом)
    return next('router'); // Якщо значення не збігається, переходимо до наступного роутера
  }
  next(); // Якщо значення збігається, продовжуємо виконання
};
export default auth;
