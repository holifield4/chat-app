import type { Socket } from "socket.io-client";
import type { Room } from "./rooms.types";
import type { Message, MessagePayload } from "./message.types";

// *** SOCKET EVENTS *** =======================================================
export interface ClientToServerEvents {
  getRoomList: (callback: (rooms: Room[]) => void) => void;
  joinRoom: (roomName: string, callback: (roomName: string) => void) => void;
  sendMessage: (payload: MessagePayload) => void;
}

export interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  userJoined: (payload: { username: string; room: string }) => void;
  rooms: (rooms: Room[]) => void;
  message: (message: Message) => void;
}
export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;


// SOCKET STORE ================================================================
export interface SocketStore {
    socket: ClientSocket;
    connect: () => void;
    disconnect: () => void;
}