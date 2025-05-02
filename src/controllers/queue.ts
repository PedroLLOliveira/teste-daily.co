import { Request, Response, NextFunction } from 'express';
import { dailyApi } from '../api/daily';

// fila em memória
interface QueueItem { roomName: string; patientName: string; url: string; createdAt: number; }
const queue: QueueItem[] = [];

export const createPatientRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientName } = req.body as { patientName: string };
    // 1) cria a sala na Daily.co
    const { data } = await dailyApi.post('/rooms', { privacy: 'public' });
    const roomName = data.name;
    const url: string = data.url;
    // 2) empurra para a fila
    queue.push({ roomName, patientName, url, createdAt: Date.now() });
    // 3) retorna dados da sala
    res.status(201).json({ roomName, url, patientName });
  } catch (err) {
    next(err);
  }
};

export const listQueue = (_: Request, res: Response) => {
  // ordena por createdAt
  const sorted = [...queue].sort((a,b) => a.createdAt - b.createdAt);
  res.json(sorted);
};

export const removeFromQueue = (req: Request, res: Response) => {
  const { roomName } = req.params;
  const idx = queue.findIndex((q) => q.roomName === roomName);
  if (idx !== -1) queue.splice(idx, 1);
  res.status(204).end();
};
