import type { Socket } from "socket.io-client";
import type { InviteMembers, Room } from "./rooms.types";
import type { Message, MessagePayload } from "./message.types";

// *** SOCKET EVENTS *** =======================================================
export interface ClientToServerEvents {
  sendMessage: (payload: MessagePayload) => void;
  createRoom: (roomName: string) => void;
  inviteMembers: (payload: InviteMembers) => void;
  getAvailableMembers: (roomName: string, callback: (members: string[]) => void) => void;
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