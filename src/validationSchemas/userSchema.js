import { loginSchema } from './loginSchema.js';

const { userEmail, password } = loginSchema;

export const userSchema = {
  Email: userEmail,
  Password: password,
  FirstName: {
    trim: true,
    notEmpty: {
      errorMessage: 'FirstName must be not empty',
      isLength: { options: { min: 1, max: 20 } }
    }
  },
  MiddleName: {
    optional: true,
    trim: true,
    isLength: { options: { min: 1, max: 20 } }
  },
  LastName: {
    trim: true,
    notEmpty: {
      errorMessage: 'LastName must be not empty',
      isLength: { options: { min: 1, max: 20 } }
    }
  },
  IsAdmin: { optional: true, isBoolean: { errorMessage: 'Must be boolean' } },
  Status: { optional: true }
};
