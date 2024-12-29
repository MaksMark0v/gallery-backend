export const loginSchema = {
  userEmail: {
    trim: true,
    normalizeEmail: true,
    isEmail: {
      errorMessage: 'Must be a valid e-mail address'
    },
    notEmpty: {
      errorMessage: 'E-mail must be not empty'
    }
  },
  password: {
    errorMessage:
      'The password must be at least 6 characters, and must contain a symbol [-_$#]',
    isLength: { options: { min: 6 } },
    matches: { options: /[-_$#]/ }
  }
};

const { password, ...other } = loginSchema;
export const changePasswordSchema = { newPassword: password, ...other };
