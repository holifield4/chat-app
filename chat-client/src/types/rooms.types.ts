export type Room = {
  name: string;
  userCount: number;
};
export interface RoomStore {
  roomList: Room[];
  setRoomList: (rooms: Room[]) => void;
  createRoom: (roomname: string) => void;
}
