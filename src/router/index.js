
import express from "express";
import auth from "../middleware/authMiddleware.js";

const router = express.Router(); // Створення роутера

router.use(auth);

export default router;

