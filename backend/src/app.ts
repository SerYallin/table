import express from 'express';
import cors from 'cors';
import numbers from './routes/numbers';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: false,
  }),
);
app.use(express.json());

app.use('/api', numbers);

export default app;
