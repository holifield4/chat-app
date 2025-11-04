import { randomUUID } from 'crypto';
import type { AppSocket, IO, Message, MessageContent } from '../types/type';
import { getCurrentTime } from '../utils/time.util';

export const messageHandler = (io: IO, socket: AppSocket) => {
  
  const sendMessage = (msgContent: MessageContent) => {
    const payload: Message = {
        id: randomUUID(),
        roomId: msgContent.toRoom,
        username: socket.data.username,
        message: msgContent.messageContent,
        timestamp: getCurrentTime()
    };

    //broadcast the message to the target room
    io.to(payload.roomId).emit('message', payload);
  };

  socket.on('sendMessage', sendMessage);
};
