import express from 'express';
import rateLimit from 'express-rate-limit';
import { xss } from 'express-xss-sanitizer';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import dotenv from 'dotenv';
import { connectDb } from './db/database.mjs';

dotenv.config({ path: './config/config.env' });

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'You are killing me, get lost!!!',
});

await connectDb();
const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use('/api/', limiter);

app.use(xss());

app.use(hpp());

app.use(express.json({ limit: '10kb' }));

// app.use((req, res, next) => {
//   console.log('Header Info: ', req.headers.authorization);
//   next();
// });

export { app };
