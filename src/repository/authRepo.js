import CryptoJS from 'crypto-js'; // Імпорт бібліотеки CryptoJS для хешування паролів
import User from '../models/User.js'; // Імпорт моделі User

// Функція для зміни пароля
export async function changePassword(Email, Password) {
    // Пошук користувача за електронною поштою
    const user = await User.findOne({
        where: { Email },
        attributes: ['Id', 'Email'] // Вибір тільки Id та Email користувача
    });
    
    // Якщо користувач не знайдений, викидається помилка
    if (!user) {
        throw new Error('Something went wrong');
    }
    
    // Хешування нового пароля
    const { hash, salt } = hashPassword(Password);
    user.PasswordHash = hash; // Збереження хешу пароля
    user.PasswordSalt = salt; // Збереження солі
    
    // Збереження оновленого користувача
    await user.save();
}

// Функція для хешування пароля
function hashPassword(Password) {
    // Генерація випадкової солі
    const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    
    // Хешування пароля з використанням солі
    const hash = CryptoJS.PBKDF2(Password, salt, {
        keySize: 64 / 4, // Розмір ключа
        iterations: 100, // Кількість ітерацій
        hasher: CryptoJS.algo.SHA512 // Алгоритм хешування
    }).toString(CryptoJS.enc.Hex);
    
    // Повернення хешу та солі
    return { hash, salt };
}
