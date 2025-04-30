import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import roomsRouter from './controllers/rooms';
import queueRouter from './routes/queue';


dotenv.config();
const app = express();

// 👉 Habilita CORS apenas para o seu frontend em dev
app.use(
  cors({
    origin: 'http://localhost:5173', // URL exata do Vite
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true,               // se precisar enviar cookies
  })
);

// Ainda precisa do JSON parser
app.use(express.json());

// Suas rotas
app.use('/api/rooms', roomsRouter);
app.use('/api', queueRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
