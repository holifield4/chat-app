import { AppSocket, IO, Room } from '../types/type';

//helper to update room detail when user join/leave
export const updateRoom = (
  io: IO,
  socket: AppSocket,
  updateType: 'self' | 'broadcast'
) => {
  if(updateType === 'self'){
    console.log('updating for self', socket.data.username)
    getRoomForSelf(io, socket, (rooms) => {
      socket.emit('rooms', rooms)
    })
  } else {
    console.log('updating for others')
    const rooms = updateAllRooms(io);
    
    socket.broadcast.emit('rooms', rooms);
  }
};

//function to get room list and no. of user in room
const updateAllRooms = (
  io: IO,
): Room[] => {
  const allExistingRooms = io.sockets.adapter.rooms; //include room the socket not joined
  const roomList: Room[] = [];

  //eliminates rooms that by default named as the socket id itself and list only the room that the socket has joined
  for (const [roomId, connectedSocketIds] of allExistingRooms) {
   if(!connectedSocketIds.has(roomId)){ //to this part it only eliminates the rooms named with socketIds
    const room: Room = {
      name: roomId,
      userCount: connectedSocketIds.size,
    }
    roomList.push(room);
   }
  }
  //send the room list to the client
  return roomList
};

const getRoomForSelf = (io: IO, socket: AppSocket, cb: (rooms: Room[]) => void) => {
  const allExistingRooms = io.sockets.adapter.rooms;
  const roomList: Room[] = [];

  for(const roomId of socket.rooms){
    if(roomId !== socket.id){
      const connectedSocketIds = allExistingRooms.get(roomId);

      if(connectedSocketIds){
        const room: Room = {
          name: roomId,
          userCount: connectedSocketIds.size
        };
        roomList.push(room);
      }
    }
  }
  cb(roomList);
}

//main channel handler function
export const channelHandler = (io: IO, socket: AppSocket) => {
  //list the available rooms on connected
  getRoomForSelf(io, socket, (rooms) => {
    console.log('listing room for', socket.data.username);
    socket.emit('rooms', rooms);
  });

  socket.on('createRoom', (newRoomName: string) => {
    socket.join(newRoomName);
    updateRoom(io, socket, 'self');
  });
};
