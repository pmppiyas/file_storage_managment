import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import router from './app/routes/router';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import passport from 'passport';
import './app/config/passport';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { envVars } from './app/config/env';

const app = express();

app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(envVars.DATABASE_URL);
    } catch (error) {
      console.error('Database connection error in middleware:', error);
    }
  }
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(compression());
app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.send('Storage Management API is running');
});

app.use('/api/v1', router);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

app.use(globalErrorHandler);

export default app;
