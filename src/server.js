import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './env.js';
import contactsRouter from './routers/contacts.js';
import userAuthRouter from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';


export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());
  app.use(cors());

const PORT = Number(env('PORT', '5000'));


  app.use("/", contactsRouter);
  app.use("/auth", userAuthRouter);

  app.use(errorHandler);
  app.use(notFoundHandler);

  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
};