import Gallery from '../models/Gallery.js';

import Sequelize, { Op } from 'sequelize';

export async function addGallery(galleryData, userId) {
  try {
    const { Id } = await Gallery.create({
      ...galleryData,
      UserId: userId
    });

    return { Id };
  } catch (error) {
    throw new Error('Failed to create gallery');
  }
}

export async function getAllGalleries(
  userId,
  { page = 1, size = 10, filter = {} }
) {
  const params = {
    where: {
      UserId: userId,
      DeletedAt: { [Op.is]: null }
    },
    attributes: [
      'Id',
      'Name',
      'UserId',
      'UpdatedAt',
      'Description',
      [Sequelize.fn('COUNT', Sequelize.col('Pictures.Id')), 'TotalPictures']
    ],
    include: [
      {
        association: 'Pictures',
        attributes: [],
        duplicating: false
      }
    ],
    order: [['UpdatedAt', 'DESC']],
    group: ['Gallery.Id'],
    offset: (page - 1) * size,
    limit: +size
  };

  if (filter.Name) {
    params.where.Name = { [Op.like]: `%${filter.Name}%` };
  }

  const result = await Gallery.findAndCountAll(params);

  return {
    Data: result.rows,
    Count: result.count.length,
    CountPages: Math.ceil(result.count.length / size || 1)
  };
}

export async function getGalleryDetails(userId, galleryId) {
  const gallery = await Gallery.findOne({
    where: {
      UserId: userId,
      Id: galleryId,
      DeletedAt: { [Op.is]: null }
    },
    attributes: ['Id', 'Name', 'UserId', 'Description', 'UpdatedAt'],

    include: [
      {
        association: 'Pictures',
        attributes: ['Id', 'Name', 'URL', 'Description']
      }
    ]
  });

  return gallery;
}

export async function updateGallery(galleryData, userId, galleryId) {
  const gallery = await Gallery.findOne({
    where: {
      UserId: userId,
      Id: galleryId,
      DeletedAt: { [Op.is]: null }
    }
  });

  if (!gallery) {
    return null;
  }

  Object.assign(gallery, galleryData);
  gallery.UpdatedAt = new Date();
  const { Id } = await gallery.save();
  return { Id };
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
  const { Id } = await gallery.save();
  return { Id };
}

export async function isGalleryOwner(userId, galleryId) {
  const gallery = await Gallery.findOne({
    where: {
      Id: galleryId,
      UserId: userId,
      DeletedAt: { [Op.is]: null }
    }
  });

  if (!gallery) return false;

  return true;
}
