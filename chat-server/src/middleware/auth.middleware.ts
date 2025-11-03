import type { AppSocket, IO, SocketData } from '../types/type';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const verifyHandshake = (io: IO) => {
  io.use((socket: AppSocket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token as string | null;

    if (!token) {
      return next(new Error('Authentication error: Token not provided'));
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as SocketData;
      socket.data.username = decoded.username;
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });
};
