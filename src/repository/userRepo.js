import _ from 'underscore';
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
    ]
  };

  const include = [
    {
      model: Gallery,
      include: [
        {
          association: 'Pictures'
        }
      ]
    }
  ];

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
    Data,
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
      'Status',
      'AvatarUrl'
    ]
    // include: [
    //   {
    //     model: Gallery,
    //     include: [
    //       {
    //         association: 'Pictures'
    //       }
    //     ]
    //   }
    // ]
  });

  console.log(user);

  return user;
}

export async function saveUser(userData, userId) {
  let userObject = {};

  // ----------------------------------------------------------------
  // Встановлення значень за замовчуванням для обов'язкових полів, якщо вони відсутні

  const defaultPasswordHash = 'defaultHashValue';
  const defaultPasswordSalt = 'defaultSaltValue';

  // ----------------------------------------------------------------
  console.log('user ID ', userId);

  if (userId) {
    userObject = await User.findOne({ where: { Id: userId } });
    if (!userObject) {
      throw new Error('User not found!');
    }
  } else {
    userObject = new User({
      IsAdmin: 0,
      Status: 'not_approved',
      PasswordHash: defaultPasswordHash,
      PasswordSalt: defaultPasswordSalt
    });
  }

  const fields = ['FirstName', 'MiddleName', 'LastName', 'Email'];

  const data = _.pick(userData, fields);
  Object.assign(userObject, data);

  await userObject.save();

  return userObject.Id;
}

export async function deleteUser(userId) {
  const user = await User.findOne({
    where: {
      Id: userId,
      DeletedAt: {
        [Op.is]: null
      }
    }
  });
  if (!user) {
    throw new Error('User not found!');
  }
  user.DeletedAt = new Date();
  await user.save();
  return userId;
}
