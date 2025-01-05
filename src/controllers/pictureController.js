import express from 'express';
import jwtAuth from '../middleware/authMiddleware.js';
import bodyParser from 'body-parser';
import { addPicture, getPictureData, getPictureDetails, updatePicture, deletePicture } from '../repository/pictureRepo.js';

const router = express.Router();

router.get('/user/:userId/galleries/:galleryId/pictures', jwtAuth, async (req, res) => {
    try {
        const galleryId = req.params.galleryId;
        if (!galleryId) {
            return res.status(400).send({ message: 'Invalid  gallery id' });
        }
        const pictureData = await getPictureData( galleryId, req.query);
        res.send(pictureData);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

router.get('/user/:userId/galleries/:galleryId/pictures/:pictureId', jwtAuth, async (req, res) => {
    const galleryId = req.params.galleryId;
    const pictureId = req.params.pictureId;
    try {
        if (!galleryId || !pictureId) {
            return res.status(400).send({ message: 'Invalid user, gallery, or picture id' });
        }
        const pictureDetails = await getPictureDetails( galleryId, pictureId);
        res.send(pictureDetails);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

router.post('/user/:userId/galleries/:galleryId/pictures', jwtAuth, bodyParser.json(), async (req, res) => {
    const newPicture = req.body;
    const galleryId = req.params.galleryId;
    try {
        if (!galleryId) {
            return res.status(400).send('GalleryId is required');
        }
        if (!newPicture.Name) {
            return res.status(400).send('Picture Name is required');
        }
        const Id = await addPicture(newPicture, galleryId);
        res.send({ Id });
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

router.put('/user/:userId/galleries/:galleryId/pictures/:pictureId', jwtAuth, bodyParser.json(), async (req, res) => {
    const pictureData = req.body;
    const galleryId = req.params.galleryId;
    const pictureId = req.params.pictureId;
    try {
        if (!galleryId || !pictureId) {
            return res.status(400).send('Invalid  gallery or picture id');
        }
        const Id = await updatePicture(pictureData, galleryId, pictureId);
        res.send({ Id });

    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

router.delete('/user/:userId/galleries/:galleryId/pictures/:pictureId', jwtAuth, async (req, res) => {
    const galleryId = req.params.galleryId;
    const pictureId = req.params.pictureId;
    try {
        if ( !galleryId || !pictureId) {
            return res.status(400).send('Invalid  gallery or picture id');
        }
        const Id = await deletePicture( galleryId, pictureId);
        if (Id) {
            res.status(404).send(`Picture deleted ${Id}`);
        }
        res.status(200).end();
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
})
export default router;
