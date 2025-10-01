import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { mockApi } from '../services/mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthenticated: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await mockApi.login(email, password);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setAuthenticated: () => {
        // Simple authentication - just set as authenticated with a default user
        set({
          user: {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: '',
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'demo-token',
          isAuthenticated: true,
          isLoading: false,
        });
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true });
        try {
          const currentUser = get().user;
          if (!currentUser) throw new Error('No user found');

          const updatedUser = await mockApi.updateProfile(currentUser.id, data);
          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getCurrentUser: async () => {
        const token = get().token;
        if (!token) return;

        set({ isLoading: true });
        try {
          const user = await mockApi.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);