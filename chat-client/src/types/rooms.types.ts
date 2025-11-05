export type Room = {
  name: string;
  userCount: number;
};

export type InviteMembers = {
  members: string[];
  toRoom: string;
}

export interface RoomStore {
  roomList: Room[];
  availableMembers: string[];
  setRoomList: (rooms: Room[]) => void;
  createRoom: (roomName: string) => void;
  inviteMembers: (members: InviteMembers) => void;
  getAvailableMembers: (roomName: string) => void;
}
