import {
  authUserDetailsController,
  changePasswordController,
  loginController
} from '../controllers/authController.js';
import jwtAuth from '../middleware/authMiddleware.js';
import router from './index.js';

router.get('/auth', jwtAuth, authUserDetailsController);

router.post('/login', loginController);

router.post('/auth/change-password', changePasswordController);

export default router;
