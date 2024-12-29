import { isGalleryOwner } from '../repository/galleryRepo.js';

async function ownerValidate(req, res, next) {
  try {
    const galleryId = req.params.id;
    const isOwner = await isGalleryOwner(req.auth.userId, galleryId);
    if (!isOwner)
      return res
        .status(404)
        .json({ message: `Gallery ${galleryId} not found` });
    next();
  } catch (error) {
    next(error);
  }
}

export default ownerValidate;
