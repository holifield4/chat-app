import { create } from "zustand";
import type { User } from "../types/types";

const useLogin = create<User>((set) => ({
  username: "",
  setUsername: (username: string) => set(() => ({ username: username })),
  removeUser: () => set(() => ({ username: "" })),
}));

export default useLogin;
