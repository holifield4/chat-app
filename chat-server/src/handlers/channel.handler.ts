import { AppSocket, IO, Room } from '../types/type';

//helper to update room detail when user join/leave
export const updateRoom = (io: IO) => {
  getRoomList(io, (rooms) => {
    io.emit("rooms", rooms)
  })
}

//function to get room list and no. of user in room
const getRoomList = (io: IO, cb: (rooms: Room[]) => void) => {
  const allExistingRooms = io.sockets.adapter.rooms;
  const allConnectedUsers = io.sockets.sockets;
  const roomList: Room[] = [];

  //eliminates rooms that by default named as the socket id itself
  for (const [roomId, connectedSocketIds] of allExistingRooms.entries()) {
    if (!allConnectedUsers.has(roomId)) {
      const room: Room = {
        name: roomId,
        userCount: connectedSocketIds.size,
      };

      roomList.push(room);
    }
  }
  //send the room list to the client
  cb(roomList);
};

export const channelHandler = (io: IO, socket: AppSocket) => {
  socket.on('getRoomList', (cb: (rooms: Room[]) => void) => {
    if (typeof cb !== 'function') {
      //return if not ack
      return;
    }
    getRoomList(io, cb);
  });

};
