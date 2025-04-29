import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import userAuthRouter from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from "./middlewares/swaggerDocs.js";


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
  app.use(cookieParser());
  app.use(`/uploads`, express.static(UPLOAD_DIR));

const PORT = Number(process.env['PORT']);


app.use("/contacts", contactsRouter);
app.use("/auth", userAuthRouter);
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());
  
 
app.use(notFoundHandler);
app.use(errorHandler);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

