import router from './index.js';

import {
  createGalleryController,
  deleteGalleryController,
  getAllGalleryController,
  getGalleryController,
  updateGalleryController
} from '../controllers/galleryController.js';

router
  .route('/user/:userId/galleries')
  .get(getAllGalleryController)
  .post(createGalleryController);

router
  .route('/user/:userId/galleries/:galleryId')
  .get(getGalleryController)
  .put(updateGalleryController)
  .delete(deleteGalleryController);

export default router;
