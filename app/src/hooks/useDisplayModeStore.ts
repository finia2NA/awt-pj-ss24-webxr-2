/* eslint-disable no-unused-vars */
import create from 'zustand';

export enum DisplayMode {
  LIGHT = 'light',
  DARK = 'dark',
}

interface DisplayModeState {
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
  toggleMode: () => void;
}

// My proposed convention: zustand hooks have "Store" in their name
const useDisplayModeStore = create<DisplayModeState>((set) => ({
  mode: DisplayMode.DARK,
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === DisplayMode.DARK ? DisplayMode.LIGHT : DisplayMode.DARK,
    })),
}));

export default useDisplayModeStore;
