
import Gallery from '../models/Gallery.js';
import { Op } from 'sequelize';

// Функція для додавання нової галереї
export async function addGallery(galleryData, userId) {
    try {
        const newGallery = await Gallery.create({
            ...galleryData,
            UserId: userId // Зв'язування галереї з користувачем
        });

        return newGallery.Id;
    } catch (error) {
        console.error('Error creating gallery:', error);
        throw new Error('Failed to create gallery');
    }
}

// Функція для отримання даних галерей
export async function getGalleryData({ page = 1, size = 10, filter = {} }) {
    const params = {
        where: {
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
            'Description',
            'UserId'
        ],
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

// Функція для отримання деталей галереї за ID
export async function getGalleryDetails(galleryId) {
    const gallery = await Gallery.findOne({
        where: {
            Id: galleryId,
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
            'Description',
            'UserId'
        ],
        include: [
            {
                association: 'Pictures'
            }
        ]
    });

    if (!gallery) {
        throw new Error('Gallery not found');
    }

    return gallery;
}

// Функція для оновлення галереї
export async function updateGallery(galleryData, galleryId) {
    const gallery = await Gallery.findOne({
        where: {
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

// Функція для видалення галереї (логічне видалення)
export async function deleteGallery(galleryId) {
    const gallery = await Gallery.findOne({
        where: {
            Id: galleryId,
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
