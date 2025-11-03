import { create } from "zustand";
import type { ClientSocket, SocketStore } from "../types/socket.types";
import { io } from "socket.io-client";
import useAuth from "./useAuth";
import useRoom from "./useRoom";
import { storeMessages } from "./useMessage";
import useUser from "./useUser";

const socket: ClientSocket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
  autoConnect: false,
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

    socket.on("connect", () => {
      // 1.get room list on connect and store to state
      // 2.join the user to general room by default
      socket.emit("getRoomList", (rooms) => {
        useRoom.getState().setRoomList(rooms);
        useUser.getState().setUserCurrentRoom(rooms[0].name);
      });
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

    socket.on("userJoined", (payload) => {
      //payload here is what the server send
      console.log(`User ${payload.username} joined room ${payload.room}`);
    });

    socket.on("connect_error", (e) => {
      console.log("Failed to connect: ", e);
    });
  },

  //manual disconnect @ user does not close/exit the app
  disconnect: () => {
    socket.disconnect();
    useRoom.getState().setRoomList([]);
    useUser.getState().setUserCurrentRoom(null);
  },
}));

export const appSocket = useSocket.getState().socket;
export default useSocket;
