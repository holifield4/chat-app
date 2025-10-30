import { AppSocket, IO, Room } from '../types/type';

export const channelHandler = (io: IO, socket: AppSocket) => {
  const getRooms = (cb: (rooms: Room[]) => void) => {

    if (typeof cb !== 'function') {
      console.warn(
        "Client emitted 'getRooms' without an acknowledgement callback. Skipping response.",
      );
      return;
    }

    const allRooms = io.sockets.adapter.rooms;
    const connectedUser = io.sockets.sockets;

    const roomsList: Room[] = [];

    for (const [roomId, socketIds] of allRooms.entries()) {
      if (!connectedUser.has(roomId)) {
        const room: Room = {
          name: roomId,
          userCount: socketIds.size,
        };

        roomsList.push(room);
      }
    }

    console.log(
      `Sending ${roomsList.length} public rooms list to ${socket.data.username || socket.id}`,
    );
    cb(roomsList);
  };

  socket.on('getRooms', getRooms);
};
