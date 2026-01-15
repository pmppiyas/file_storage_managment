import dotenv from 'dotenv';
dotenv.config();

interface EnvConfig {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production';
  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
  BCRYPT_SALT: string;
  JWT: {
    ACCESS_SECRET: string;
    ACCESS_EXPIRED: string;
    REFRESH_SECRET: string;
    REFRESH_EXPIRED: string;
  };
  GOOGLE: {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    CALLBACK_URL: string;
  };
  FRONTEND_URL: string;
  NODE_MAILER: {
    SENDER_EMAIL: string;
    SENDER_PASSWORD: string;
  };
}

const loadEnvVars = (): EnvConfig => {
  const requiredEnvVars: string[] = [
    'PORT',
    'DATABASE_URL',
    'NODE_ENV',
    'CLOUD_NAME',
    'API_KEY',
    'API_SECRET',
    'BCRYPT_SALT',
    'ACCESS_SECRET',
    'ACCESS_EXPIRED',
    'REFRESH_SECRET',
    'REFRESH_EXPIRED',
    'CLIENT_ID',
    'CLIENT_SECRET',
    'CALLBACK_URL',
    'FRONTEND_URL',
    'SENDER_EMAIL',
    'SENDER_PASSWORD',
  ];
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',

    CLOUDINARY: {
      CLOUD_NAME: process.env.CLOUD_NAME as string,
      API_KEY: process.env.API_KEY as string,
      API_SECRET: process.env.API_SECRET as string,
    },

    BCRYPT_SALT: process.env.BCRYPT_SALT as string,
    JWT: {
      ACCESS_SECRET: process.env.ACCESS_SECRET as string,
      ACCESS_EXPIRED: process.env.ACCESS_EXPIRED as string,
      REFRESH_SECRET: process.env.REFRESH_SECRET as string,
      REFRESH_EXPIRED: process.env.REFRESH_EXPIRED as string,
    },

    GOOGLE: {
      CLIENT_ID: process.env.CLIENT_ID as string,
      CLIENT_SECRET: process.env.CLIENT_SECRET as string,
      CALLBACK_URL: process.env.CALLBACK_URL as string,
    },

    FRONTEND_URL: process.env.FRONTEND_URL as string,

    NODE_MAILER: {
      SENDER_EMAIL: process.env.SENDER_EMAIL as string,
      SENDER_PASSWORD: process.env.SENDER_PASSWORD as string,
    },
  };
};

export const ENV = loadEnvVars();
