import type { AppSocket, IO } from '../types/type';

export const authHandler = (io: IO, socket: AppSocket) => {
    
  //associated username to socket after successfully logged in
  const setUsername = (payload: string) => {
    console.log(`@${payload} logged in with socket id: ${socket.id}`);
    socket.data.username = payload;
  };

  const disconnect = () => {
    console.log(`@${socket.data.username}[${socket.id}] has disconnected`);
  };

  socket.on('setUsername', setUsername);
  socket.on('disconnect', disconnect);
};
