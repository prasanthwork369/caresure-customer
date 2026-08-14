import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import { setAccessToken, setTokenPersister, setUnauthorizedHandler } from "@/api";

const TOKEN_KEY = "caresure.auth.token";
const GUEST_KEY = "caresure.auth.isGuest";

interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoaded: boolean;
  initialize: () => Promise<void>;
  login: (token: string) => Promise<void>;
  continueAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isGuest: false,
  isLoaded: false,

  // Presence-only check — a stale token still gets used optimistically, and
  // the first request it fails on triggers the normal refresh flow. This
  // matches the proven old app behavior (confirmed: expiresAt is never
  // actually read back, so cold start never proactively checks expiry).
  initialize: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAccessToken(token);
        set({ isAuthenticated: true, isLoaded: true });
        return;
      }
      const isGuest = (await AsyncStorage.getItem(GUEST_KEY)) === "true";
      set({ isGuest, isLoaded: true });
    } catch {
      set({ isLoaded: true });
    }
  },

  login: async (token) => {
    setAccessToken(token);
    set({ isAuthenticated: true, isGuest: false });
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, token),
      AsyncStorage.removeItem(GUEST_KEY),
    ]);
  },

  continueAsGuest: async () => {
    set({ isGuest: true });
    await AsyncStorage.setItem(GUEST_KEY, "true");
  },

  logout: async () => {
    setAccessToken(null);
    set({ isAuthenticated: false, isGuest: false });
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      AsyncStorage.removeItem(GUEST_KEY),
    ]);
  },
}));

// Registered here (not the root layout) so the behavior lives next to the
// store that owns it. client.ts stays decoupled from SecureStore/Zustand —
// it only knows about these two callback slots.
setUnauthorizedHandler(() => {
  useAuthStore.getState().logout();
});
setTokenPersister((token) => {
  SecureStore.setItemAsync(TOKEN_KEY, token);
});
