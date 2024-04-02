import { Router } from 'express';
import * as homeController from '../controllers/home.js';

const router = Router();
router.get('/', homeController.index);

export default router;
