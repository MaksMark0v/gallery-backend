import router from './index.js';

import {
  createGalleryController,
  deleteGalleryController,
  getAllGalleryController,
  getGalleryController,
  updateGalleryController
} from '../controllers/galleryController.js';
import jwtAuth from '../middleware/authMiddleware.js';

router
  .route('/galleries')
  .all(jwtAuth)
  .get(getAllGalleryController)
  .post(createGalleryController);

router
  .route('/user/:userId/galleries/:galleryId')
  .all(jwtAuth)
  .get(getGalleryController)
  .put(updateGalleryController)
  .delete(deleteGalleryController);

export default router;
