export type Message = {
  id: string;
  roomId: string;
  username: string;
  message: string;
  timestamp: string;
}

export type MessagePayload = {
  messageContent: string;
  toRoom: string;
}

export interface MessageStore {
  messages: Message[];
  storeMessages: (message: Message) => void;
  sendMessage: (payload: MessagePayload) => void;
}
