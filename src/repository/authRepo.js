import CryptoJS from 'crypto-js';
import User from '../models/User.js';
import generateJwt from '../helpers/generateJWT.js';

export async function loginByCredentials(Email, Password) {
  const user = await User.findOne({
    where: { Email },
    attributes: [
      'Id',
      'FirstName',
      'LastName',
      'Email',
      'PasswordHash',
      'PasswordSalt'
    ]
  });

  if (!user) {
    throw new Error('Something went wrong');
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
    throw new Error('Something went wrong');
  }

  const { hash, salt } = hashPassword(Password);
  user.PasswordHash = hash;
  user.PasswordSalt = salt;

  await user.save();
}

function comparePasswords(Password, Hash, Salt) {
  const newHash = CryptoJS.PBKDF2(Password, Salt, {
    keySize: 64 / 4,
    iterations: 100,
    hasher: CryptoJS.algo.SHA512
  }).toString(CryptoJS.enc.Hex);
  return Hash === newHash;
}

function hashPassword(Password) {
  const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);

  const hash = CryptoJS.PBKDF2(Password, salt, {
    keySize: 64 / 4,
    iterations: 100,
    hasher: CryptoJS.algo.SHA512
  }).toString(CryptoJS.enc.Hex);

  return { hash, salt };
}
