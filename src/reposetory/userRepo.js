import { readFile } from 'fs/promises'; // Імпорт функції readFile з модуля fs/promises для роботи з файлами асинхронно

export async function getUsersData(query) {
  const data = JSON.parse(await readFile('./resourses/db.json', 'utf8')); // Читання файлу db.json та парсинг JSON-даних
  const users = data.result.map((user) => {
    // Створення нового масиву користувачів з потрібними полями
    return {
      FirstName: user.name.first,
      MiddleNameL: user.name.middle,
      LastName: user.name.last,
      UserName: user.username,
      Status: user.status
    };
  });

  let paginatedUsers = users; // Ініціалізація змінної для зберігання пагінованих користувачів
  if (query.page && query.size) {
    // Перевірка наявності параметрів пагінації у запиті
    const lastIndex = query.page * query.size; // Визначення останнього індексу
    const firstIndex = lastIndex - query.size; // Визначення першого індексу
    paginatedUsers = users.slice(firstIndex, lastIndex); // Вибірка пагінованих користувачів
  }

  if (query.filter && query.filter.Status) {
    // Перевірка наявності фільтру 'active' у запиті
    console.log(query);
    paginatedUsers = paginatedUsers.filter(
      (user) => user.Status === query.filter.Status
    );
  }

  return {
    Data: paginatedUsers, // Відправка даних користувачів
    Count: users.length, // Загальна кількість користувачів
    CountPages: Math.ceil(users.length / query.size || 1) // Визначення кількості сторінок
  };
}
export async function getUserDetails(userId) {
  const data = JSON.parse(await readFile('./resourses/db.json', 'utf8'));
  const userDetails = data.result.find(item => item.id === +userId);
  if (!userDetails) {
    return { message: 'User not found' }
  }
  return {
    Id: userDetails.id,
    FirstName: userDetails.name.first,
    MiddleNameL: userDetails.name.middle,
    LastName: userDetails.name.last,
    UserName: userDetails.username,
    Status: userDetails.status,
    PhoneNumber: userDetails.phoneNumber,
    Emails: userDetails.emails.join(', '),
    Location: Object.values(userDetails.location) // Отримання всіх значень об'єкта userDetails.location
      .flatMap(value =>
        typeof value === 'object' // Перевірка, чи є значення об'єктом
          ? Object.values(value) // Якщо значення є об'єктом, отримуємо його значення
          : value // Якщо значення не є об'єктом, залишаємо його без змін
      ).join(', ') // Об'єднуємо всі значення в один рядок, розділений комами
  };
}
