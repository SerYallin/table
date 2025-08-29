import express from 'express';
import cors from 'cors';
import numbers from './routes/numbers';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: false,
  }),
);
app.use(express.json());

app.use('/api', numbers);

export default app;
