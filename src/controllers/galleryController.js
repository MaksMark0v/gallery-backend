import {
  addGallery,
  deleteGallery,
  getAllGalleries,
  getGalleryDetails,
  updateGallery
} from '../repository/galleryRepo.js';

const getAllGalleriesController = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const galleryData = await getAllGalleries(userId, req.query);
    res.json(galleryData);
  } catch (error) {
    next(error);
  }
};

const getGalleryController = async (req, res, next) => {
  const userId = req.auth.userId;
  const galleryId = req.params.galleryId;
  try {
    if (!galleryId) {
      return res.status(400).json({ message: 'galleryId is required' });
    }
    const galleryDetails = await getGalleryDetails(userId, galleryId);
    if (!galleryDetails)
      return res.status(404).json({
        message: `Gallery ${galleryId} not found`
      });
    res.json(galleryDetails);
  } catch (error) {
    next(error);
  }
};

const createGalleryController = async (req, res, next) => {
  const newGallery = req.body;
  const userId = req.auth.userId;
  try {
    if (!newGallery.Name) {
      return res.status(400).json({ message: 'GalleryName is required' });
    }
    const createdGallery = await addGallery(newGallery, userId);
    res.json(createdGallery);
  } catch (error) {
    next(error);
  }
};

const updateGalleryController = async (req, res, next) => {
  const galleryData = req.body;
  const userId = req.auth.userId;
  const galleryId = req.params.galleryId;
  try {
    if (!galleryId) {
      return res.status(400).json({ message: 'galleryId is required' });
    }
    const updatedGallery = await updateGallery(galleryData, userId, galleryId);
    if (updatedGallery === null)
      return res.status(404).json({
        message: `Gallery ${galleryId} not found`
      });

    res.json(updatedGallery);
  } catch (error) {
    next(error);
  }
};

const deleteGalleryController = async (req, res, next) => {
  const userId = req.auth.userId;
  const galleryId = req.params.galleryId;

  try {
    if (!galleryId) {
      return res.status(400).json({ message: 'GalleryId is required' });
    }
    const deletedGallery = await deleteGallery(userId, galleryId);
    if (deletedGallery === null)
      return res.status(404).json({
        message: `Gallery ${galleryId} not found`
      });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export {
  getAllGalleriesController,
  getGalleryController,
  createGalleryController,
  updateGalleryController,
  deleteGalleryController
};
