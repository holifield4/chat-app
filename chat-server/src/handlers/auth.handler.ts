import type { AppSocket, IO } from '../types/type';
import { updateRoom } from './channel.handler';

export const authHandler = (io: IO, socket: AppSocket) => {
  //join the client to general room by default on connected
  socket.join('general');

  //update room count for other sockets when client join
  updateRoom(io, socket, 'broadcast');
  
  //todo:
  //broadcast to the general room when user joined
  io
    .to('general')
    .emit('userJoined', { username: socket.data.username, room: 'general' });

  socket.on('disconnecting', () => {
    //update room for everyone when a user is about to disconnect
    //this is called before the socket leaves the rooms
    // setTimeout(() => updateRoom(io, socket), 0);
  });

  socket.on('disconnect', () => {
    console.log(`@${socket.data.username} [${socket.id}] has disconnected`);
    //update room user count
    updateRoom(io, socket, 'broadcast');
  });
};
