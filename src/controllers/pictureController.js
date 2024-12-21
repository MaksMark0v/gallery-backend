import express from 'express';
import jwt from '../middleware/authMiddleware.js';
import Picture from '../models/Picture.js';
import { Op } from 'sequelize';
import bodyParser from 'body-parser';

const router = express.Router();

async function addPicture(pictureData, galleryId) {
    try {
        const newPicture = await Picture.create({
            ...pictureData,
            GalleryId: galleryId
        });
        return newPicture.Id;
    } catch (error) {
        console.error('Error while creating new picture:', error);
        throw new Error('Failed to create new picture');
    }
}

async function getPictureData(galleryId, { page = 1, size = 10, filter = {} }) {
    const params = {
        where: {
            GalleryId: galleryId,
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
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

async function getPictureDetails(galleryId, pictureId) {
    const picture = await Picture.findOne({
        where: {
            Id: pictureId,
            GalleryId: galleryId,
            DeletedAt: { [Op.is]: null }
        },
        attributes: [
            'Id',
            'Name',
            'GalleryId'
        ],
    });
    if (!picture) {
        throw new Error('Picture not found');
    }
    return picture;
}

async function updatePicture(pictureData, galleryId, pictureId) {
    const picture = await Picture.findOne({
        where: {
            Id: pictureId,
            GalleryId: galleryId,
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

async function deletePicture(userId, galleryId, pictureId) {
    const picture = await Picture.findOne({
        where: {
            Id: pictureId,
            UserId: userId,
            GalleryId: galleryId,
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

router.get('/user/:userId/galleries/:galleryId/pictures', jwt, async (req, res) => {
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

router.get('/user/:userId/galleries/:galleryId/pictures/:pictureId', jwt, async (req, res) => {
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

router.post('/user/:userId/galleries/:galleryId/pictures', jwt, bodyParser.json(), jwt, async (req, res) => {
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

router.put('/user/:userId/galleries/:galleryId/pictures/:pictureId', jwt, bodyParser.json(), async (req, res) => {
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

router.delete('/user/:userId/galleries/:galleryId/pictures/:pictureId', jwt, async (req, res) => {
    const galleryId = req.params.galleryId;
    const pictureId = req.params.pictureId;
    try {
        if ( !galleryId || !pictureId) {
            return res.status(400).send('Invalid  gallery or picture id');
        }
        const Id = await deletePicture( galleryId, pictureId);
        if (Id) {
            res.status(404).send('Picture not found');
        }
        res.status(200).end();
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`);
    }
})
export default router;
