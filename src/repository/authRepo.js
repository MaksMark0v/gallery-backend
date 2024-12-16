import CryptoJS from 'crypto-js';
import User from '../models/User.js';

export async function changePassword(Email, Password) {
    const user = await User.findOne({
        where: { Email },
        attributes: ['Id', 'Email']
    });

    if (!user) {
        throw new Error('Something went wrong')
    }

    const { hash, salt } = hashPassword(Password);

    user.PasswordHash = hash;
    user.PasswordSalt = salt;

    await user.save();
}

function hashPassword(Password) {
    const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)
    const hash = CryptoJS.PBKDF2(Password, salt, {
        keySize: 64 / 4,
        iterations: 100,
        hasher: CryptoJS.algo.SHA512
      }).toString(CryptoJS.enc.Hex);
    return { hash, salt };
  }