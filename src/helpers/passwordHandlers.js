import CryptoJS from 'crypto-js';

export function comparePasswords(Password, Hash, Salt) {
  const newHash = CryptoJS.PBKDF2(Password, Salt, {
    keySize: 64 / 4,
    iterations: 100,
    hasher: CryptoJS.algo.SHA512
  }).toString(CryptoJS.enc.Hex);
  return Hash === newHash;
}

export function hashPassword(Password) {
  const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
  const hash = CryptoJS.PBKDF2(Password, salt, {
    keySize: 64 / 4,
    iterations: 100,
    hasher: CryptoJS.algo.SHA512
  }).toString(CryptoJS.enc.Hex);

  return { hash, salt };
}
