import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  location: string;
  skillLevel: string;
  frequency: string;
  imageUrl: string | null;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
