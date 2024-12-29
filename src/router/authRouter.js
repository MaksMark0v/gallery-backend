import { checkSchema } from 'express-validator';
import {
  authUserDetailsController,
  changePasswordController,
  loginController
} from '../controllers/authController.js';
import jwtAuth from '../middleware/authMiddleware.js';
import router from './index.js';
import {
  loginSchema,
  changePasswordSchema
} from '../validationSchemas/loginSchema.js';
import bodyValidate from '../middleware/bodyValidationMiddleware.js';

router.get('/auth', jwtAuth, authUserDetailsController);

router.post('/login', checkSchema(loginSchema), bodyValidate, loginController);

router.post(
  '/auth/change-password',
  checkSchema(changePasswordSchema),
  bodyValidate,
  changePasswordController
);

export default router;
