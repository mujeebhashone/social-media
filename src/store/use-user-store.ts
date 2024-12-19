import { create } from 'zustand'
import { User } from '@/types'

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ currentUser: user }),
  updateUser: (userData) =>
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, ...userData }
        : null,
    })),
  logout: () => set({ currentUser: null }),
})) 