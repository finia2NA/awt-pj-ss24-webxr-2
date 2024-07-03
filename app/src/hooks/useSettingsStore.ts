/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import API_URL from '../assets/secret';

export enum BiTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export enum TriTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
  SYSTEM = 'System',
}

export interface SettingsState {
  biTheme: BiTheme;
  setBiTheme: (biTheme: BiTheme) => void;
  toggleTheme: () => void;

  dvbiUrl: string | null;
  setDvbiUrl: (dvbiUrl: string) => void;
}

export const useSettingsStore = create(
  persist(
    (set) => ({
      biTheme: BiTheme.DARK,
      setBiTheme: (biTheme: BiTheme) => set({ biTheme }),
      toggleTheme: () =>
        set((state: SettingsState) => ({
          biTheme: state.biTheme === BiTheme.DARK ? BiTheme.LIGHT : BiTheme.DARK,
        })),


      dvbiUrl: API_URL,
      setDvbiUrl: (dvbiUrl: string) => set({ dvbiUrl }),
    }),
    {
      name: 'settings-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useSettingsStore;
