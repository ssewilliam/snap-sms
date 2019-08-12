import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.get('/', userController.welcome);
router.post('/user', userController.register);

export default router;
