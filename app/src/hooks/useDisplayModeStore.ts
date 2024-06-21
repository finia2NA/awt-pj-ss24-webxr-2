/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export enum BiTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export enum TriTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
  SYSTEM = 'System',
}

export interface DisplayModeState {
  biTheme: BiTheme;
  setBiTheme: (biTheme: BiTheme) => void;
  toggleTheme: () => void;
}

export const useDisplayModeStore = create(
  persist(
    (set) => ({
      biTheme: BiTheme.DARK,
      setBiTheme: (biTheme: BiTheme) => set({ biTheme }),
      toggleMode: () =>
        set((state: DisplayModeState) => ({
          biTheme: state.biTheme === BiTheme.DARK ? BiTheme.LIGHT : BiTheme.DARK,
        })),
    }),
    {
      name: 'display-mode', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useDisplayModeStore;
