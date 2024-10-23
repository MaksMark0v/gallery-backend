import { readFile, writeFile } from 'fs/promises'; // Імпорт функції readFile з модуля fs/promises для роботи з файлами асинхронно

export async function getUsersData({ page, size, filter }) {
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

  let filterUser = users;
  if (filter && filter.Status) {
    // Перевірка наявності фільтру у запиті
    filterUser = filterUser.filter(
      (user) => user.Status === filter.Status
    );
  }

  let paginatedUsers = filterUser; // Ініціалізація змінної для зберігання пагінованих користувачів
  if (page && size) {
    // Перевірка наявності параметрів пагінації у запиті
    const lastIndex = page * size; // Визначення останнього індексу
    const firstIndex = lastIndex - size; // Визначення першого індексу
    paginatedUsers = paginatedUsers.slice(firstIndex, lastIndex); // Вибірка пагінованих користувачів
  }



  return {
    Data: paginatedUsers, // Відправка даних користувачів
    Count: filterUser.length, // Загальна кількість користувачів
    CountPages: Math.ceil(filterUser.length / size || 1) // Визначення кількості сторінок
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
export async function saveUser(userData, userId) {
  const dataBase = JSON.parse(await readFile('./resourses/db.json', 'utf8'));
  if (userId) {
    const userData = dataBase.result.find(item => item.id === +userId);
    console.log(3, userData);
    if (!userData) {
      throw new Error('User not found');
    }
  }
  const userObject = JSON.parse(userData);
  console.log(423, userObject);
  dataBase.result.push(userObject);
  await writeFile('./resourses/db.json', JSON.stringify(dataBase));
  return userObject.id;
}
