import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import expertRoutes from './routes/experts';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'AI Nexus API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/ai', aiRoutes);

export default app;
