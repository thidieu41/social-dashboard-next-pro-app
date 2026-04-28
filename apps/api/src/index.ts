import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: process.env.WEB_ORIGIN || 'http://localhost:8000',
  credentials: true,
}));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Hello from API' });
});

app.use('/api', authRouter);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});