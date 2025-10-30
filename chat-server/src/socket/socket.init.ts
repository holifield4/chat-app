import { authHandler } from '../handlers/auth.handler';
import { channelHandler } from '../handlers/channel.handler';
import { AppSocket, IO } from '../types/type';

/**
 *
 *  Events handler
 */
export const initEventHandlers = (io: IO) => {
  io.on('connection', (socket: AppSocket) => {

    authHandler(io, socket);
    channelHandler(io, socket);
    
    socket.on('chats', (message) => {
      console.log(`[${socket.data.username}]: ${message}`);
    });

  });
};
