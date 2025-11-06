import { create } from "zustand";
import type { Token } from "../types/user.types";
import useSocket from "./useSocket";

const useAuth = create<Token>((set) => ({
  token: localStorage.getItem('item'),
  isAuthenticated: !!localStorage.getItem("token"),
  storeToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false });
    useSocket.getState().disconnect();
  },

}));

export default useAuth;
