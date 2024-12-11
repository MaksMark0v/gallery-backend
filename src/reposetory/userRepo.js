// import { readFile, writeFile } from 'fs/promises'; // Імпорт функцій readFile та writeFile з модуля fs/promises для роботи з файлами асинхронно

import User from '../models/User.js';

import { Op } from 'sequelize';
import Gallery from '../models/Gallery.js';
import Picture from '../models/Picture.js';

export async function getUsersData({ page = 1, size = 100, filter = {} }) {
  const params = {
    where: {
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
  userData.PasswordHash = userData.PasswordHash || defaultPasswordHash;
  userData.PasswordSalt = userData.PasswordSalt || defaultPasswordSalt;
  // ----------------------------------------------------------------
  if (userId) {
    userObject = await User.findOne({ where: { Id: userId } });
    if (!userObject) {
      throw new Error('User not found'); // Кидаємо помилку, якщо користувача не знайдено 
    }
    await userObject.update(userData); // Оновлення даних існуючого користувача 
  } else {
    userObject = await User.create(userData); // Створення нового користувача 
  } // Обробка даних галерей 
  if (userData.galleries) {
    for (const galleryData of userData.galleries) {
      const gallery = await Gallery.create({ UserId: userObject.Id, ...galleryData }); // Обробка даних картин 
      if (galleryData.pictures) {
        for (const pictureData of galleryData.pictures) {
          await Picture.create({ GalleryId: gallery.Id, ...pictureData });
        }
      }
    }
  }
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

