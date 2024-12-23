import express from 'express';
import jwt from '../middleware/authMiddleware.js';
import bodyParser from 'body-parser';
import { addGallery, getGalleryData, getGalleryDetails, updateGallery, deleteGallery } from '../repository/galleryRepo.js';

const router = express.Router();

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
router.put('/user/:userId/galleries/:galleryId', bodyParser.json(), jwt, async (req, res) => {
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
