// src/routes/rooms.ts
import { Router } from 'express';
import { dailyApi } from '../api/daily';

const router = Router();

// GET /api/rooms  — lista todas as salas
router.get('/', async (req, res) => {
  try {
    const response = await dailyApi.get('/rooms');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Falha ao buscar salas' });
  }
});

// POST /api/rooms — cria nova sala
router.post('/', async (req, res) => {
  try {
    const { name, privacy = 'public' } = req.body;
    const response = await dailyApi.post('/rooms', { name, privacy });
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Falha ao criar sala' });
  }
});

export default router;