import express from 'express';
import cors from 'cors';
import numbers from './routes/numbers';
import cacheMiddleware from './middleware/cache';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: false,
  }),
);
app.use(express.json());

app.use(cacheMiddleware);

app.use('/api', numbers);

export default app;
