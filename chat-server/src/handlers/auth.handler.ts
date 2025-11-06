import type { AppSocket, IO } from '../types/type';
import { updateRoom } from './channel.handler';

export const authHandler = (io: IO, socket: AppSocket) => {
  //join the client to general room by default on connected
  socket.join('general');

  //update room count for other sockets when client join
  updateRoom(io, socket, 'broadcast');
  
  //broadcast to all other sockets when user joined
  socket.broadcast.emit('userJoined', socket.data.username);

  socket.on('disconnect', () => {
    console.log(`@${socket.data.username} [${socket.id}] has disconnected`);
    //update room user count
    updateRoom(io, socket, 'broadcast');
  });
};
