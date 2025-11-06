import { create } from "zustand";
import type { User } from "../types/user.types";

const useUser = create<User>((set) => ({
  username: localStorage.getItem("username") || "",
  userCurrentRoom: null,
  setUsername: (username: string) => set({ username }),
  setUserCurrentRoom: (roomId) => set({ userCurrentRoom: roomId }),
}));

export default useUser;
