// Імпортуємо бібліотеку для підтримки async/await в середовищах, які не підтримують його нативно
import 'regenerator-runtime/runtime.js';
// Імпортуємо об'єкт бази даних та функцію для ініціалізації підключення до бази даних
import db, { initDatatbaseConnection } from '../lib/db.js';
// Імпортуємо функцію для скасування міграції
import { revertMigration } from '../lib/migration.js';

// Визначаємо та одразу виконуємо асинхронну функцію
(async function bootstrap() {
    try {
        // Обробник для неконтрольованих виключень
        process.on('uncaughtException', (err) => {
            console.error(err); // Логування помилки в консоль
        });

        // Ініціалізуємо підключення до бази даних
        await initDatatbaseConnection();

        // Отримуємо назву міграції з аргументів командного рядка
        const [, , migrationName] = process.argv;

        // Викликаємо функцію для скасування міграції, передаючи базу даних та назву міграції
        await revertMigration(db, migrationName);

        // Виходимо з процесу з кодом 0, що означає успішне завершення
        process.exit(0);
    } catch (err) {
        // У випадку помилки, логування помилки в консоль
        console.error(err);
        // Виходимо з процесу з кодом 1, що означає невдале завершення
        process.exit(1);
    }
}());