import Picture from '../models/Picture.js';
import { Op } from 'sequelize';

export async function addPicture(pictureData, galleryId) {
  try {
    const newPicture = await Picture.create({
      ...pictureData,
      GalleryId: galleryId
    });

    return newPicture.Id;
  } catch (error) {
    throw new Error('Failed to add picture');
  }
}

export async function getPicturesFromGallery(
  galleryId,
  { page = 1, size = 10, filter = {} }
) {
  const params = {
    where: {
      GalleryId: galleryId,
      DeletedAt: { [Op.is]: null }
    },
    attributes: ['Id', 'Name', 'URL', 'Description']
  };

  if (filter.Name) {
    params.where.Name = { [Op.like]: `%${filter.Name}%` };
  }

  const Data = await Picture.findAll({
    ...params,
    offset: (page - 1) * size,
    limit: +size
  });
  const Count = await Picture.count(params);

  return {
    Data,
    Count,
    CountPages: Math.ceil(Count / size || 1)
  };
}

export async function getPictureDetails(galleryId, pictureId) {
  const picture = await Picture.findOne({
    where: {
      GalleryId: galleryId,
      Id: pictureId,
      DeletedAt: { [Op.is]: null }
    },
    attributes: ['Id', 'Name', 'URL', 'Description']
  });

  return picture;
}

export async function updatePicture(pictureData, galleryId, pictureId) {
  const picture = await Picture.findOne({
    where: {
      GalleryId: galleryId,
      Id: pictureId,
      DeletedAt: { [Op.is]: null }
    }
  });

  if (!picture) return null;
  Object.assign(picture, pictureData);
  await picture.save();

  return picture.Id;
}

export async function deletePicture(galleryId, pictureId) {
  const picture = await Picture.findOne({
    where: {
      GalleryId: galleryId,
      Id: pictureId,
      DeletedAt: { [Op.is]: null }
    }
  });

  if (!picture) {
    return null;
  }

  picture.DeletedAt = new Date();
  await picture.save();

  return picture.Id;
}
