import Gallery from '../models/Gallery.js';
import { Op } from 'sequelize';

export async function addGallery(galleryData, userId) {
  try {
    const newGallery = await Gallery.create({
      ...galleryData,
      UserId: userId
    });

    return newGallery.Id;
  } catch (error) {
    console.error('Error creating gallery:', error);
    throw new Error('Failed to create gallery');
  }
}

export async function getGalleryData(
  userId,
  { page = 1, size = 10, filter = {} }
) {
  const params = {
    where: {
      UserId: userId,
      DeletedAt: { [Op.is]: null }
    },
    attributes: ['Id', 'Name', 'UserId']
  };

  if (filter.Name) {
    params.where.Name = { [Op.like]: `%${filter.Name}%` };
  }

  const include = [
    {
      association: 'Pictures'
    }
  ];

  const Data = await Gallery.findAll({
    ...params,
    include,
    offset: (page - 1) * size,
    limit: +size
  });
  const Count = await Gallery.count(params);

  return {
    Data,
    Count,
    CountPages: Math.ceil(Count / size || 1)
  };
}

export async function getGalleryDetails(userId, galleryId) {
  const gallery = await Gallery.findOne({
    where: {
      UserId: userId,
      Id: galleryId,
      DeletedAt: { [Op.is]: null }
    },
    attributes: ['Id', 'Name', 'UserId'],

    include: [
      {
        association: 'Pictures',
        attributes: ['Id', 'Name', 'URL', 'Description']
      }
    ]
  });

  if (!gallery) {
    throw new Error('Gallery not found');
  }

  return gallery;
}

export async function updateGallery(userId, galleryData, galleryId) {
  const gallery = await Gallery.findOne({
    where: {
      UserId: userId,
      Id: galleryId,
      DeletedAt: { [Op.is]: null }
    }
  });

  if (!gallery) {
    throw new Error('Gallery not found');
  }

  Object.assign(gallery, galleryData);
  await gallery.save();

  return gallery.Id;
}

export async function deleteGallery(userId, galleryId) {
  const gallery = await Gallery.findOne({
    where: {
      Id: galleryId,
      UserId: userId,
      DeletedAt: { [Op.is]: null }
    }
  });

  if (!gallery) {
    return null;
  }

  gallery.DeletedAt = new Date();
  await gallery.save();

  return gallery.Id;
}
