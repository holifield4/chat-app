import { AppSocket, IO } from '../types/type';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const verifyHandshake = (io: IO) => {
  io.use((socket: AppSocket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error: Token not provided'));
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as {
        username: string;
      };
      socket.data.username = decoded.username;
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });
};
