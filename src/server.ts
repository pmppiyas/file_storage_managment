/* eslint-disable no-console */

import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { ENV } from './app/config/ENV';

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(ENV.DATABASE_URL);
    console.log('Connected to Storage Database');

    server = app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Error during startup:', error);
  }
};

(async () => {
  await startServer();
})();

process.on('unhandledRejection', (err) => {
  console.log('Unhandle Rejection Detected... Server sutting down', err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught exception detected. Server sutting down', error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('Sigterm signal recieved. Server sutting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal recieved. Server sutting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
