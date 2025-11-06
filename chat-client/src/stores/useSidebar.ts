import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  changeSidebarState: () => void;
}

const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  changeSidebarState: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebar;
