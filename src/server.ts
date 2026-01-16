import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';

const startServer = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(envVars.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to Storage Database');

    if (process.env.NODE_ENV !== 'production') {
      app.listen(envVars.PORT, () => {
        console.log(`Server is running locally on port ${envVars.PORT}`);
      });
    }
  } catch (error) {
    console.error('Error during startup:', error);
  }
};

startServer();

export default app;
