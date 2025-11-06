import { create } from "zustand";
import type { RoomStore } from "../types/rooms.types";
import { appSocket } from "./useSocket";
import { toast } from "../utils/toast";

const useRoom = create<RoomStore>((set) => ({
  roomList: [],
  availableMembers: [],
  setRoomList: (newRoomList) => set({ roomList: newRoomList }),
  createRoom: (newRoom) => {
    appSocket.emit("createRoom", newRoom, (success, message) => {
      if (success) {
        toast(message, "success");
      } else {
        toast(message, "error");
      }
    });
  },
  inviteMembers: (members) => {
    appSocket.emit("inviteMembers", members);
  },
  getAvailableMembers: (roomName) => {
    appSocket.emit("getAvailableMembers", roomName, (members) => {
      set({ availableMembers: members });
    });
  },
}));

export default useRoom;
