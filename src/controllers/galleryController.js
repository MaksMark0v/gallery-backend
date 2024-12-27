import {
  addGallery,
  deleteGallery,
  getGalleryData,
  getGalleryDetails,
  updateGallery
} from '../repository/galleryRepo.js';

const getAllGalleryController = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const galleryData = await getGalleryData(userId, req.query);
    res.send(galleryData);
  } catch (error) {
    console.error(error);
    res.status(500).json(`Internal server error: ${error.message}`);
  }
};

const getGalleryController = async (req, res) => {
  const userId = req.auth.userId;
  const galleryId = req.params.galleryId;
  try {
    if (!galleryId) {
      return res.status(400).json('GalleryId is required');
    }
    const galleryDetails = await getGalleryDetails(userId, galleryId);
    res.send(galleryDetails);
  } catch (error) {
    res.status(500).json(`Internal server error: ${error.message}`);
  }
};

const createGalleryController = async (req, res) => {
  const newGallery = req.body;
  const userId = req.auth.userId;
  try {
    if (!newGallery.Name) {
      return res.status(400).json('Gallery Name is required');
    }
    const Id = await addGallery(newGallery, userId);
    res.send({ Id });
  } catch (error) {
    res.status(500).json(`Internal server error: ${error.message}`);
  }
};

const updateGalleryController = async (req, res) => {
  const galleryData = req.body;
  const userId = req.auth.userId;
  const galleryId = req.params.galleryId;
  try {
    if (!galleryId) {
      return res.status(400).json('GalleryId is required');
    }
    const Id = await updateGallery(galleryData, userId, galleryId);
    res.send({ Id });
  } catch (error) {
    res.status(500).json(`Internal server error: ${error.message}`);
  }
};

const deleteGalleryController = async (req, res) => {
  const userId = req.auth.userId;
  const galleryId = req.params.galleryId;

  try {
    if (!galleryId) {
      return res.status(400).send('GalleryId is required');
    }
    const Id = await deleteGallery(userId, galleryId);
    if (!Id) {
      res.status(404).json('Gallery not found');
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json(`Internal server error: ${error.message}`);
  }
};

export {
  getAllGalleryController,
  getGalleryController,
  createGalleryController,
  updateGalleryController,
  deleteGalleryController
};
