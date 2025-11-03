import { create } from "zustand";
import type { RoomStore } from "../types/rooms.types";
import { appSocket } from "./useSocket";
import useUser from "./useUser";

const useRoom = create<RoomStore>((set) => ({
  roomList: [],
  setRoomList: (newRoomList) => set({ roomList: newRoomList }),
  joinRoom: (roomName, callback) => {
    appSocket.emit('joinRoom', roomName, (newRoomName) => {
      //update user current active room
      useUser.getState().setUserCurrentRoom(roomName);
      
      callback(newRoomName);
    })
  }
}));

export default useRoom;
