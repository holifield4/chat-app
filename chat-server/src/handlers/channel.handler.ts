import { RemoteSocket } from 'socket.io';
import { AppSocket, InviteMembersToRoom, IO, Room } from '../types/type';

//helper to update room detail when user join/leave
export const updateRoom = async (
  io: IO,
  socket: AppSocket,
  updateType: 'self' | 'broadcast',
) => {
  if (updateType === 'self') {
    console.log('updating for self', socket.data.username);
    getRoomList(io, socket, (rooms) => {
      socket.emit('rooms', rooms);
    });
  } else {
    console.log('updating for others');

    const allCurrentConnectedSocketIds = await io.fetchSockets(); //fetch all connected sockets

    for (const singleSocket of allCurrentConnectedSocketIds) {
      getRoomList(io, singleSocket, (rooms) => {
        singleSocket.emit('rooms', rooms); //update rooms for other sockets
      });
    }
  }
};

const getRoomList = (
  io: IO,
  socket: AppSocket | RemoteSocket<any, AppSocket>,
  cb: (rooms: Room[]) => void,
) => {
  const allExistingRooms = io.sockets.adapter.rooms;
  const roomList: Room[] = [];

  for (const roomId of socket.rooms) {
    if (roomId !== socket.id) {
      const connectedSocketIds = allExistingRooms.get(roomId);

      if (connectedSocketIds) {
        const room: Room = {
          name: roomId,
          userCount: connectedSocketIds.size,
        };
        roomList.push(room);
      }
    }
  }
  cb(roomList);
};

const inviteMembers = async (io: IO, payload: InviteMembersToRoom) => {
  const sockets = await io.fetchSockets();

  payload.members.forEach((username) => {
    const memberToInvite = sockets.find((s) => s.data.username === username);

    if (!memberToInvite) throw new Error('No user found.');

    memberToInvite.join(payload.toRoom);
  });
};

const getMembersToInvite = async (
  io: IO,
  socket: AppSocket,
  targetRoom: string,
  cb: (members: string[]) => void,
) => {
  const connectedSockets = await io.fetchSockets();

  const availableMembers: string[] = [];

  for (const singleSocket of connectedSockets) {
    if (socket.id === singleSocket.id) continue; //exclude requestor

    const isAvailableToAdd = !singleSocket.rooms.has(targetRoom); //check if not member of target room

    if (isAvailableToAdd) {
      availableMembers.push(singleSocket.data.username);
    }
  }
  cb(availableMembers);
};

//main channel handler function
export const channelHandler = (io: IO, socket: AppSocket) => {
  //list the available rooms on connected
  getRoomList(io, socket, (rooms) => {
    socket.emit('rooms', rooms);
  });

  socket.on('createRoom', (newRoomName: string) => {
    socket.join(newRoomName);
    updateRoom(io, socket, 'self');
  });

  socket.on('inviteMembers', (members) => {
    inviteMembers(io, members);
    updateRoom(io, socket, 'self');
    updateRoom(io, socket, 'broadcast');
  });

  socket.on('getAvailableMembers', (room, cb) => {
    getMembersToInvite(io, socket, room, cb);
  });
};
