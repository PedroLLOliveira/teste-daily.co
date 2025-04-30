import { Router } from 'express';
import roomsRouter from '../controllers/rooms';
import tokensRouter from './tokens';

const router = Router();

debugger;
router.use('/rooms', roomsRouter);
router.use('/rooms', tokensRouter);

export default router;