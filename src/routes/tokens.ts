// src/routes/tokens.ts
import { Router } from 'express';
import { dailyApi } from '../api/daily';

const router = Router();

// POST /api/rooms/:roomName/tokens — gera token de acesso
router.post('/:roomName/tokens', async (req, res) => {
  try {
    const { roomName } = req.params;
    const { properties = {} } = req.body;
    const response = await dailyApi.post(
      `/rooms/${roomName}/meeting-tokens`,
      { properties }
    );
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Falha ao gerar token' });
  }
});

export default router;