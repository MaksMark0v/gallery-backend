// import { readFile, writeFile } from 'fs/promises'; // Імпорт функцій readFile та writeFile з модуля fs/promises для роботи з файлами асинхронно
import _ from "underscore";
import { Op } from 'sequelize';


import User from '../models/User.js';
import Gallery from '../models/Gallery.js';


export async function getUsersData({ page = 1, size = 100, filter = {} }) {
  const params = {
    where: {
      DeletedAt: { [Op.is]: null }
    },
    attributes: [
      'Id',
      'FirstName',
      'IsAdmin',
      'MiddleName',
      'LastName',
      'Email',
      'Status'
    ],
  }
    const include = [
      {
        model: Gallery,
        include: [
          {
            association: 'Pictures'
          }
        ]
      }
    ]

  if (filter && filter.Status) {
    params.where.Status = filter.Status;
  }

  const Data = await User.findAll({
    ...params,
    include,
    offset: (page - 1) * size,
    limit: +size
  });
  const Count = await User.count(params);

  return {
    Data ,
    Count,
    CountPages: Math.ceil(Count / size || 1)
  };
}

export async function getUserDetails(userId) {
  const user = await User.findOne({
    where: {
      Id: userId,
      DeletedAt: { [Op.is]: null }
    },
    attributes: [
      'Id',
      'FirstName',
      'MiddleName',
      'LastName',
      'Email',
      'Status'
    ],
    include: [
      {
        model: Gallery,
        include: [
          {
            association: 'Pictures'
          }
        ]
      }
    ]
  });

  if (!user) {
    return { message: 'User not found' }; // Повідомлення, якщо користувача не знайдено
  }

  return {
    userDetails: user // Повернення даних користувача
  };
}


export async function saveUser(userData, userId) {
  let userObject = {};

  // ----------------------------------------------------------------
  // Встановлення значень за замовчуванням для обов'язкових полів, якщо вони відсутні 

  const defaultPasswordHash = 'defaultHashValue';
  const defaultPasswordSalt = 'defaultSaltValue';

  // ----------------------------------------------------------------
  if (userId) {
    userObject = await User.findOne({ where: { Id: userId } });
    if (!userObject) {
      return; // як альтернатива - завершувати виконання функції щоб повертався undefined
      // throw new Error('User not found'); // Кидаємо помилку, якщо користувача не знайдено 
    }
  } else {
    userObject = new User({
      IsAdmin: 0,
      Status: 'not_approved',
      PasswordHash: defaultPasswordHash,
      PasswordSalt: defaultPasswordSalt
    }) // Створення нового користувача 
  }

      // Picks required fields from body and save data to request table
      const fields = [
        'FirstName',
        'MiddleName',
        'LastName',
        'Email'
      ];

      const data = _.pick(userData, fields);
      Object.assign(userObject, data);

      await userObject.save();

  return userObject.Id; // Повернення ID збереженого користувача
}

export async function deleteUser(userId) {
  const user = await User.findOne({
    where: {
      Id: userId,
      DeletedAt: {
        [Op.is]: null
      }
    }
  }
  );
  if (!user) {
    return null
  }
  user.DeletedAt = new Date(); // Міняємо статус користувача на 'Deleted'
  await user.save(); // Збереження змін
  return userId; // Повернення ID видаленого користувача 
}

