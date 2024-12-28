import {
  userDetailsController,
  UsersDataController,
  createUserController,
  updateUserController,
  deleteUserController
} from '../controllers/userController.js';
import jwtAuth from '../middleware/authMiddleware.js';
import router from './index.js';

router
  .route('/user')
  .all(jwtAuth)
  .get(UsersDataController)
  .post(createUserController);
router
  .route('/user/:id')
  .all(jwtAuth)
  .get(userDetailsController)
  .put(updateUserController)
  .delete(deleteUserController);

export default router;
