import { create } from "zustand";
import type { ClientSocket, SocketStore } from "../types/socket.types";
import { io } from "socket.io-client";
import useAuth from "./useAuth";
import useRoom from "./useRoom";
import { storeMessages } from "./useMessage";
import useUser from "./useUser";
import { toast } from "../utils/toast";

const socket: ClientSocket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

socket.on("rooms", (rooms) => {
  useRoom.getState().setRoomList(rooms);
});

socket.on("message", (payload) => {
  storeMessages(payload);
});

socket.on("disconnect", () => {
  useRoom.getState().setRoomList([]);
  useUser.getState().setUserCurrentRoom(null);
});

socket.on("userJoined", (user) => {
  toast(`${user} has joined WebChat`, "info");
});

socket.on("connect_error", (e) => {
  toast(`Failed to connect: ${e}`, "error");
});

const useSocket = create<SocketStore>(() => ({
  socket,
  connect: () => {
    if (socket.connected) return; //return if already connected

    //retrieve token
    const token = useAuth.getState().token;

    //pass token to socket
    socket.auth = { token };

    socket.connect();

    socket.once("connect", () => {
      //set current room to general by default
      useUser.getState().setUserCurrentRoom("general");
    });
  },
  //manual disconnect via button
  disconnect: () => {
    socket.disconnect();
  },
}));

export const appSocket = useSocket.getState().socket;
export default useSocket;
