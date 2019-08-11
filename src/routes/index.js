import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.get('/', userController.welcome);

export default router;
