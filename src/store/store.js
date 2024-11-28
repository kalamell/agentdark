import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      otpRequested: false,
      cc: false,
      // Authentication actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setOtpRequested: (status) => set({ otpRequested: status }),
      setToken: (token) => set({ token }),
      setCom: (cc) => set({ cc: !!cc }),
    }),
    {
      name: 'user-9sigha-storage', // Name of the localStorage key
      partialize: (state) => ({ user: state.user, token: state.token, cc: state.cc }), // Only persist user and token
    }
  )
);

export default useStore;
