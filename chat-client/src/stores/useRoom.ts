import { create } from "zustand";
import type { RoomStore } from "../types/rooms.types";
import { appSocket } from "./useSocket";

const useRoom = create<RoomStore>((set) => ({
  roomList: [],
  availableMembers: [],
  setRoomList: (newRoomList) => set({ roomList: newRoomList }),
  createRoom: (newRoom) => {
    appSocket.emit("createRoom", newRoom);
  },
  inviteMembers: (members) => {
    appSocket.emit('inviteMembers', members);
  },
  getAvailableMembers: (roomName) => {
    appSocket.emit('getAvailableMembers', roomName, (members)=>{
      set({ availableMembers: members })
    })
  }
}));

export default useRoom;
