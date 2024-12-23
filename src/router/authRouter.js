import {
  authVerifyController,
  changePasswordController,
  loginController
} from '../controllers/authController.js';
import router from './index.js';

router.get('/auth', authVerifyController);

router.post('/login', loginController);

router.post('/auth/change-password', changePasswordController);

export default router;
