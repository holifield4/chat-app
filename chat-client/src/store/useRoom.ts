import { create } from "zustand";
import type { RoomStore } from "../types/rooms.types";
import { appSocket } from "./useSocket";

const useRoom = create<RoomStore>((set) => ({
  roomList: [],
  setRoomList: (newRoomList) => set({ roomList: newRoomList }),
  createRoom: (newRoom) => {
    appSocket.emit("createRoom", newRoom);
  }
}));

export default useRoom;
