import {
  addPicture,
  deletePicture,
  getPicturesFromGallery,
  getPictureDetails,
  updatePicture
} from '../repository/pictureRepo.js';

const getAllFromGalleryController = async (req, res, next) => {
  try {
    const pictureData = await getPicturesFromGallery(req.params.id, req.query);
    res.json(pictureData);
  } catch (error) {
    next(error);
  }
};

const getPictureController = async (req, res, next) => {
  const galleryId = req.params.id;
  const pictureId = req.params.pictureId;
  try {
    if (!pictureId) {
      return res.status(400).json({ message: 'pictureId is required' });
    }
    const pictureDetails = await getPictureDetails(galleryId, pictureId);
    if (!pictureDetails)
      res.status(404).json({
        message: `Picture ${pictureId} in gallery ${galleryId} not found`
      });

    res.json(pictureDetails);
  } catch (error) {
    next(error);
  }
};

const createPictureController = async (req, res, next) => {
  const newpicture = req.body;
  const galleryId = req.params.id;
  try {
    const Id = await addPicture(newpicture, galleryId);
    res.json({ Id });
  } catch (error) {
    next(error);
  }
};

const updatePictureController = async (req, res, next) => {
  const pictureData = req.body;
  const galleryId = req.params.id;
  const pictureId = req.params.pictureId;
  try {
    if (!pictureId) {
      return res.status(400).json({ message: 'pictureId is required' });
    }
    const Id = await updatePicture(pictureData, galleryId, pictureId);
    if (Id === null) {
      res.status(404).json({ message: 'Picture not found' });
    }
    res.json({ Id });
  } catch (error) {
    next(error);
  }
};

const deletePictureController = async (req, res, next) => {
  const galleryId = req.params.id;
  const pictureId = req.params.pictureId;

  try {
    if (!pictureId) {
      return res.status(400).json({ message: 'pictureId is required' });
    }
    const Id = await deletePicture(galleryId, pictureId);
    if (Id === null) {
      res.status(404).json({ message: 'Picture not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export {
  getAllFromGalleryController,
  createPictureController,
  getPictureController,
  updatePictureController,
  deletePictureController
};
