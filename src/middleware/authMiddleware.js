import { expressjwt } from 'express-jwt';

import dotenv from 'dotenv';
import { getUserId } from '../repository/authRepo.js';

dotenv.config();

const jwtAuth = [
  expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithms: ['HS256'],
    expiresIn: process.env.JWT_LIFETIME
  }),

  async (req, res, next) => {
    try {
      const email = req.auth?.Email;

      if (!email) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: Wrong token payload' });
      }

      const id = await getUserId(email);
      req.auth.userId = id;
      next();
    } catch (error) {
      console.error('Error in jwtAuth middleware:', error);
      if (error.message === 'User not found')
        res.status(401).json({ message: 'Unauthorized: User not found' });

      next(error);
    }
  }
];

export default jwtAuth;
