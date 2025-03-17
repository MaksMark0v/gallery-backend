import User from '../models/User.js';
import { Op } from 'sequelize';
import { comparePasswords, hashPassword } from '../helpers/passwordHandlers.js';
import { generateJwt } from '../helpers/generateJWT.js';

export async function loginByCredentials(Email, Password) {
  const user = await User.findOne({
    where: { Email, DeletedAt: { [Op.is]: null } },
    attributes: [
      'Id',
      'FirstName',
      'LastName',
      'Email',
      'PasswordHash',
      'PasswordSalt',
      'AvatarUrl'
    ]
  });

  if (!user) {
    return;
  }

  const isValidUser = comparePasswords(
    Password,
    user.PasswordHash,
    user.PasswordSalt
  );

  if (!isValidUser) {
    return;
  }

  const token = generateJwt(user);

  return { user, token };
}

export async function changePassword(Email, Password) {
  const user = await User.findOne({
    where: { Email },
    attributes: ['Id', 'Email']
  });

  if (!user) {
    return undefined;
  }

  const isValidUser = comparePasswords(
    Password,
    user.PasswordHash,
    user.PasswordSalt
  );

  if (!isValidUser) {
    return false;
  }

  const { hash, salt } = hashPassword(Password);
  user.PasswordHash = hash;
  user.PasswordSalt = salt;

  await user.save();
}

export async function getUserDetailsByEmail(email) {
  const user = await User.findOne({
    where: {
      Email: email,
      DeletedAt: { [Op.is]: null }
    },
    attributes: ['Id', 'FirstName', 'LastName', 'Email', 'AvatarUrl']
  });

  return user;
}

export async function getUserId(email) {
  const user = await User.findOne({
    where: {
      Email: email,
      DeletedAt: { [Op.is]: null }
    },
    attributes: ['Id']
  });

  if (!user) {
    throw new Error('User not found!');
  }
  return user.Id;
}
