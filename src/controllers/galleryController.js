import express from 'express';
import jwt from '../middleware/authMiddleware.js';
import Gallery from '../models/Gallery.js';
import { Op } from 'sequelize';
import bodyParser from 'body-parser';

const router = express.Router();

// Функція для додавання нової галереї
async function addGallery(galleryData, userId) {
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
async function getGalleryData(userId, { page = 1, size = 10, filter = {} }) {
    const params = {
        where: {
            UserId: userId, // Додавання умови для користувача
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
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
async function getGalleryDetails(userId, galleryId) {
    const gallery = await Gallery.findOne({
        where: {
            Id: galleryId,
            UserId: userId, // Додавання умови для користувача
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
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
async function updateGallery(galleryData, userId, galleryId) {
    const gallery = await Gallery.findOne({
        where: {
            Id: galleryId,
            UserId: userId, // Додавання умови для користувача
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
async function deleteGallery(userId, galleryId) {
    const gallery = await Gallery.findOne({
        where: {
            Id: galleryId,
            UserId: userId, // Додавання умови для користувача
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

// Маршрут для отримання всіх галерей користувача
router.get('/user/:userId/galleries', jwt, async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).send('UserId is required');
        }
        const galleryData = await getGalleryData(userId, req.query);
        res.send(galleryData);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

// Маршрут для отримання галереї користувача за ID
router.get('/user/:userId/galleries/:galleryId', jwt, async (req, res) => {
    const userId = req.params.userId;
    const galleryId = req.params.galleryId;
    try {
        if (!userId || !galleryId) {
            return res.status(400).send('UserId and GalleryId are required');
        }
        const galleryDetails = await getGalleryDetails(userId, galleryId);
        res.send(galleryDetails);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

// Маршрут для створення нової галереї користувача
router.post('/user/:userId/galleries', bodyParser.json(), jwt, async (req, res) => {
    const newGallery = req.body;
    const userId = req.params.userId;
    try {
        if (!userId) {
            return res.status(400).send('UserId is required');
        }
        if (!newGallery.Name) {
            return res.status(400).send('Gallery Name is required');
        }
        const Id = await addGallery(newGallery, userId);
        res.send({ Id });
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

// Маршрут для оновлення галереї користувача за ID
router.put('/user/:userId/galleries/:galleryId',  bodyParser.json(), jwt, async (req, res) => {
    const galleryData = req.body;
    const userId = req.params.userId;
    const galleryId = req.params.galleryId;
    try {
        if (!userId || !galleryId) {
            return res.status(400).send('UserId and GalleryId are required');
        }
        const Id = await updateGallery(galleryData, userId, galleryId);
        res.send({ Id });
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

// Маршрут для видалення галереї користувача за ID
router.delete('/user/:userId/galleries/:galleryId', jwt, async (req, res) => {
    const userId = req.params.userId;
    const galleryId = req.params.galleryId;
    try {
        if (!userId || !galleryId) {
            return res.status(400).send('UserId and GalleryId are required');
        }
        const Id = await deleteGallery(userId, galleryId);
        if (!Id) {
            res.status(404).send('Gallery not found');
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

export default router;
