/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import DVBIUrl from '../assets/secret';

/**
 * Enum representing the available BiTheme options.
 */
export enum BiTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

/**
 * Enum representing the available TriTheme options.
 */
export enum TriTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
  SYSTEM = 'System',
}

/**
 * Interface representing the state and actions for the settings store.
 */
export interface SettingsState {
  biTheme: BiTheme;
  setBiTheme: (biTheme: BiTheme) => void;
  toggleTheme: () => void;

  dvbiUrl: string | null;
  setDvbiUrl: (dvbiUrl: string) => void;
}

/**
 * Custom hook to manage the settings state using Zustand.
 * The state is persisted in sessionStorage.
 */
export const useSettingsStore = create(
  persist(
    (set) => ({
      /**
       * The current theme setting.
       */
      biTheme: BiTheme.DARK,

      /**
       * Sets the BiTheme to the provided value.
       * @param biTheme - The new theme to set.
       */
      setBiTheme: (biTheme: BiTheme) => set({ biTheme }),

      /**
       * Toggles the BiTheme between light and dark.
       */
      toggleTheme: () =>
        set((state: SettingsState) => ({
          biTheme: state.biTheme === BiTheme.DARK ? BiTheme.LIGHT : BiTheme.DARK,
        })),

      /**
       * The URL for DVBI.
       */
      dvbiUrl: DVBIUrl,

      /**
       * Sets the DVBI URL to the provided value.
       * @param dvbiUrl - The new URL to set.
       */
      setDvbiUrl: (dvbiUrl: string) => set({ dvbiUrl }),
    }),
    {
      name: 'settings-storage', // Name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) By default, 'localStorage' is used
    },
  ),
)

export default useSettingsStore;
