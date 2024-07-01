import { create } from 'zustand';

export interface KeyboardListeners {
  // eslint-disable-next-line no-unused-vars
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onHide: () => void;
  onSearch: () => void;
}

export interface KeyboardState extends KeyboardListeners {

  // Listeners
  eventListeners: KeyboardListeners[];
  // eslint-disable-next-line no-unused-vars
  addEventListeners: (listeners: KeyboardListeners) => void;
  // eslint-disable-next-line no-unused-vars
  removeEventListeners: (listeners: KeyboardListeners) => void;
  clearAllEventListeners: () => void;

  // Derived bundle functions: see the parent interface

  // Visibility
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
}

const useKeyboardStore = create<KeyboardState>((set, get) => ({
  // Listeners
  eventListeners: [],
  addEventListeners: (listener) => set((state) => {
    state.eventListeners.push(listener);
    return { eventListeners: state.eventListeners };
  }),
  removeEventListeners: (listener) => set((state) => {
    state.eventListeners = state.eventListeners.filter((l) => l !== listener);
    return { eventListeners: state.eventListeners };
  }),
  clearAllEventListeners: () => set((state) => {
    state.eventListeners = [];
    return { eventListeners: state.eventListeners };
  }),

  // Derived bundle functions
  onKeyPress: (key) => {
    for (const listener of get().eventListeners) {
      listener.onKeyPress(key);
    }
  },
  onBackspace: () => {
    for (const listener of get().eventListeners) {
      listener.onBackspace();
    }
  },
  onHide: () => {
    for (const listener of get().eventListeners) {
      listener.onHide();
    }
  },
  onSearch: () => {
    for (const listener of get().eventListeners) {
      listener.onSearch();
    }
  },

  // Visibility

  visible: false,
  setIsVisible: (isVisible) => set({ visible: isVisible }),
}));

export default useKeyboardStore;