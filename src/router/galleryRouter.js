import router from './index.js';

import {
  createGalleryController,
  deleteGalleryController,
  getAllGalleryController,
  getGalleryController,
  updateGalleryController
} from '../controllers/galleryController.js';
import jwtAuth from '../middleware/authMiddleware.js';
import { checkSchema } from 'express-validator';
import { gallerySchema } from '../validationSchemas/gallerySchema.js';
import bodyValidate from '../middleware/bodyValidationMiddleware.js';

router
  .route('/galleries')
  .all(jwtAuth)
  .get(getAllGalleryController)
  .post(checkSchema(gallerySchema), bodyValidate, createGalleryController);

router
  .route('/galleries/:galleryId')
  .all(jwtAuth)
  .get(getGalleryController)
  .put(checkSchema(gallerySchema), bodyValidate, updateGalleryController)
  .delete(deleteGalleryController);

export default router;
