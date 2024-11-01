import { readFile, writeFile } from 'fs/promises'; // Імпорт функцій readFile та writeFile з модуля fs/promises для роботи з файлами асинхронно

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
  const data = JSON.parse(await readFile('./resourses/db.json', 'utf8')); // Читання файлу db.json та парсинг JSON-даних
  
  const userDetails = data.result.find(item => item.id === +userId); // Пошук користувача за ID
  if (!userDetails) {    
    return { message: 'User not found' } // Повідомлення, якщо користувача не знайдено
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
  const dataBase = JSON.parse(await readFile('./resourses/db.json', 'utf8')); // Читання файлу db.json та парсинг JSON-даних
  
  let userObject = {};  
  if (userId) {    
    const existedUserDataIndex = dataBase.result.findIndex(item => item.id === +userId); // Пошук індексу існуючого користувача за ID
    
    if (!existedUserDataIndex) {      
      throw new Error('User not found'); // Кидаємо помилку, якщо користувача не знайдено
    }
    
    dataBase.result[existedUserDataIndex] = userData; // Оновлення даних існуючого користувача    
    userObject.id = userId;  
  } else {    
    const highestId = dataBase.result.slice(-1).pop().id; // Отримання найвищого ID користувача    
    const newUserData = userData;    
    newUserData.id = highestId + 1; // Присвоєння нового ID користувачу    
    userObject = newUserData;    
    dataBase.result.push(userObject); // Додавання нового користувача до бази даних
  }
  
  await writeFile('./resourses/db.json', JSON.stringify(dataBase)); // Запис оновленої бази даних у файл db.json
  return userObject.id; // Повернення ID збереженого користувача
}

export async function deleteUser(userId) {  
  const dataBase = JSON.parse(await readFile('./resourses/db.json', 'utf8')); // Читання файлу db.json та парсинг JSON-даних
  
  const existedUserDataIndex = dataBase.result.findIndex(item => item.id === +userId); // Пошук індексу існуючого користувача за ID
  if (!existedUserDataIndex) {    
    throw new Error('User not found'); // Кидаємо помилку, якщо користувача не знайдено
  }
  
  dataBase.result.splice(existedUserDataIndex, 1); // Видалення користувача з бази даних
  await writeFile('./resourses/db.json', JSON.stringify(dataBase)); // Запис оновленої бази даних у файл db.json
  return userId; // Повернення ID видаленого користувача
}
