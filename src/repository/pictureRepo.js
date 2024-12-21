import Picture from '../models/Picture.js';
import { Op } from 'sequelize';

// Функція для додавання нової картини
export async function addPicture(pictureData, galleryId,userId) {
    try {
        const newPicture = await Picture.create({
            ...pictureData,
            UserId: userId,
            GalleryId: galleryId // Зв'язування картини з галереєю
        });

        return newPicture.Id;
    } catch (error) {
        console.error('Error creating picture:', error);
        throw new Error('Failed to create picture');
    }
}

// Функція для отримання даних картин
export async function getPictureData({ page = 1, size = 10, filter = {} }) {
    const params = {
        where: {
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
            'Description',
            'UserId',
            'GalleryId'
        ],
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

// Функція для отримання деталей картини за ID
export async function getPictureDetails(pictureId) {
    const picture = await Picture.findOne({
        where: {
            Id: pictureId,
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
            'Description',
            'UserId',
            'GalleryId'
        ],
        
    });

    if (!picture) {
        throw new Error('Picture not found');
    }

    return picture;
}

// Функція для оновлення картини
export async function updatePicture(pictureData, pictureId) {
    const picture = await Picture.findOne({
        where: {
            Id: pictureId,
            DeletedAt: { [Op.is]: null }
        }
    });

    if (!picture) {
        throw new Error('Picture not found');
    }

    Object.assign(picture, pictureData);
    await picture.save();

    return picture.Id;
}

// Функція для видалення картини (логічне видалення)
export async function deletePicture(pictureId) {
    const picture = await Picture.findOne({
        where: {
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
