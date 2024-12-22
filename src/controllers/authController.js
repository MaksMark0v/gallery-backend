import bodyParser from 'body-parser'; // Імпорт модуля body-parser для парсингу JSON-запитів

import router from '../router/index.js'; // Імпорт роутера для налаштування маршрутів
import { changePassword, loginByCredentials } from '../repository/authRepo.js'; // Імпорт функції для зміни пароля з репозиторію аутентифікації

// Маршрут для перевірки аутентифікації
router.get('/auth', async (req, res) => {
    try {
        res.status(204).end(); // Відправка відповіді з статусом 204 (No Content)
    } catch (error) {
        console.error(error); // Логування помилки
        res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з статусом 500 у разі помилки
    }
});

router.post('/login', bodyParser.json(), async (req, res) => {
    const { userEmail, password} = req.body; // Отримання електронної пошти та пароля користувача з тіла запиту
    try {
        const results = await loginByCredentials(userEmail, password); // Виклик функції для аутентифікації користувача
        if (!results){
            res.status(401).end();
            return;
        }
        res.setHeader('Authorization', results.token);
        
        res.send({
            Id: results.user.Id,
            FirstName: results.user.FirstName,
            LastName: results.user.LastName,
            Email: results.user.Email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з статусом 500 у разі помилки
    }
});

// Маршрут для зміни пароля
router.post('/auth/change-password', bodyParser.json(), async (req, res) => {
    const { newPassword, userEmail } = req.body; // Отримання нового пароля та електронної пошти користувача з тіла запиту
    try {
        await changePassword(userEmail, newPassword); // Виклик функції для зміни пароля
        res.send({ message: 'Password changed' }); // Відправка повідомлення про успішну зміну пароля
    } catch (error) {
        console.error(error); // Логування помилки
        res.status(500).send(`Internal server error: ${error.message}`); // Відправка відповіді з статусом 500 у разі помилки
    }
});

export default router; // Експорт роутера за замовчуванням
