import { create } from "zustand";
import type { Token } from "../types/user.types";
import useSocket from "./useSocket";
import useUser from "./useUser";

const useAuth = create<Token>((set) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem("token"),
  storeToken: (token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", useUser.getState().username)
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    useUser.getState().setUsername("");
    set({ token: null, isAuthenticated: false });
    useSocket.getState().disconnect();
  },

}));

export default useAuth;
