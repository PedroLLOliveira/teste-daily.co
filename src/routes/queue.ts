import { Router } from 'express';
import { createPatientRoom, listQueue, removeFromQueue } from '../controllers/queue';

const router = Router();

// paciente cria sala e entra na fila
router.post('/patient-rooms', createPatientRoom);

// médico lista fila
router.get('/queue', listQueue);

// opcional: médico retira da fila após iniciar atendimento
router.delete('/queue/:roomName', removeFromQueue);

export default router;
