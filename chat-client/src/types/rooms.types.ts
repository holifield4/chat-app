export type Room = {
  name: string;
  userCount: number;
};
export interface RoomStore {
  roomList: Room[];
  setRoomList: (rooms: Room[]) => void;
  joinRoom: (roomName: string, cb: (newRoomName: string) => void) => void;
}
