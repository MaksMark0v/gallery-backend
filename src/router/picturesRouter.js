import router from './index.js';

import {
  getAllFromGalleryController,
  createPictureController,
  getPictureController,
  updatePictureController,
  deletePictureController
} from '../controllers/picturesController.js';
import jwtAuth from '../middleware/authMiddleware.js';
import { checkSchema } from 'express-validator';
import { pictureSchema } from '../validationSchemas/pictureSchema.js';
import bodyValidate from '../middleware/bodyValidationMiddleware.js';
import ownerValidate from '../middleware/ownerValidationMiddleware.js';

router
  .route('/galleries/:id/pictures')
  .all(jwtAuth, ownerValidate)
  .get(getAllFromGalleryController)
  .post(checkSchema(pictureSchema), bodyValidate, createPictureController);

router
  .route('/galleries/:id/pictures/:pictureId')
  .all(jwtAuth, ownerValidate)
  .get(getPictureController)
  .put(checkSchema(pictureSchema), bodyValidate, updatePictureController)
  .delete(deletePictureController);

export default router;
