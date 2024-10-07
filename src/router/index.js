import express from 'express';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(auth);

export default router;