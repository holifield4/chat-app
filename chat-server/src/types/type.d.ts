import { Server, Socket } from 'socket.io';

export interface Message {
  id: string;
  text: string;
  username: string;
  timestamp: number;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  setUsername: (username) => void;
  chats: (message) => void;
  getRooms: (callback: (rooms: Room[]) => void) => void;
}

interface SocketData {
  username: string;
}

export interface Room {
  name: string;
  userCount: number;
}

export type IO = Server<ClientToServerEvents, ServerToClientEvents, SocketData>;
export type AppSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData
>;
