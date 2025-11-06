import { authHandler } from '../handlers/auth.handler';
import { channelHandler } from '../handlers/channel.handler';
import { AppSocket, IO } from '../types/type';
import { verifyHandshake } from '../middleware/auth.middleware';
import { messageHandler } from '../handlers/message.handler';

/**
 *
 *  Events handler
 */
export const initEventHandlers = (io: IO) => {
  //verify handshake connecting
  verifyHandshake(io);

  io.on('connection', (socket: AppSocket) => {
    authHandler(io, socket);
    channelHandler(io, socket);
    messageHandler(io, socket);
  });
};
