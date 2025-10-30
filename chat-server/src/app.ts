import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import authRouter from './routes/auth.route';
import { errorHandler } from './middleware/error.handler';
import { IO } from './types/type';
import { initEventHandlers } from './socket/socket.init';

const app = express();
const server = createServer(app);
const io: IO = new Server(
  server,
  {
    cors: {
      origin: 'http://localhost:4000',
      methods: ['GET', 'POST'],
    },
  },
);

app.use(cors());
app.use(express.json());

const baseUri = '/api';
app.use(baseUri, authRouter);

app.use(errorHandler);

initEventHandlers(io);

export { app, io, server };
