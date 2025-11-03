import { Server, Socket } from 'socket.io';

export interface Message {
  id: string;
  roomId: string;
  username: string;
  message: string;
  timestamp: string;
}

export interface MessageContent {
  messageContent: string;
  toRoom: string
}

interface InterServerEvents {
  //todo, if required
}

interface ServerToClientEvents {
  userJoined: (payload: { username: string; room: string }) => void;
  rooms: (rooms: Room[]) => void;
  message: (message: Message) => void;
}

interface ClientToServerEvents {
  sendMessage: (content: MessageContent) => void;
  getRoomList: (callback: (rooms: Room[]) => void) => void;
  joinRoom: (roomName: string, callback: (roomName: string) => void) => void;
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
  InterServerEvents,
  SocketData
>;