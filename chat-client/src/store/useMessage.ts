import { create } from "zustand";
import type { MessageStore } from "../types/message.types";
import { appSocket } from "./useSocket";

const useMessage = create<MessageStore>((set) => ({
    messages: [],
    storeMessages: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage]})),
    sendMessage: (payload) => {
        appSocket.emit('sendMessage', payload)
    }
}))

export const storeMessages = useMessage.getState().storeMessages;

export default useMessage;