import { authHandler } from '../handlers/auth.handler';
import { channelHandler } from '../handlers/channel.handler';
import { AppSocket, IO } from '../types/type';
import { verifyHandshake } from '../middleware/auth.middleware';

/**
 *
 *  Events handler
 */
export const initEventHandlers = (io: IO) => {
  verifyHandshake(io);

  io.on('connection', (socket: AppSocket) => {
    authHandler(socket);
    channelHandler(io, socket);

    socket.on('chats', (message) => {
      console.log(`[${socket.data.username}]: ${message}`);
    });
  });
};
