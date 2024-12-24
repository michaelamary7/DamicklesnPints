import express from 'express';
const router = express.Router();
import userRoutes from './user-routes';

router.use('/user', userRoutes);

export default router;
