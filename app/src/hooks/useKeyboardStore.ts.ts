/* eslint-disable no-unused-vars */
/**
 * This file contains the hooks for using the Keyboard.
 * The architecture is as follows:
 * The App renders the Keyboard, because it needs to be positioned in 3D.
 * However, where the Keyboard is used is deep in the component tree, and can vary.
 * So, if it is shown is stored globally, and you can publish-subscribe to the keyboard
 * by adding functions that get executed with the key when it is pressed.
 * This is usually the ltter, but there is also special handling for backspace and search.
 */

import { create } from 'zustand';

/**
 * Interface defining the keyboard event listeners.
 */
export interface KeyboardListeners {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onHide: () => void;
  onSearch: () => void;
}

/**
 * Interface defining the state of the keyboard, including event listeners and visibility.
 */
export interface KeyboardState extends KeyboardListeners {
  // Listeners
  eventListeners: KeyboardListeners[];
  addEventListeners: (listeners: KeyboardListeners) => void;
  removeEventListeners: (listeners: KeyboardListeners) => void;
  clearAllEventListeners: () => void;

  // Visibility
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  toggleVisibility: () => void;
}

/**
 * Zustand store for managing keyboard state, including event listeners and visibility.
 */
const useKeyboardStore = create<KeyboardState>((set, get) => ({
  // Listeners
  eventListeners: [],
  /**
   * Adds an event listener to the list of keyboard event listeners.
   * @param listener - The event listener to add.
   */
  addEventListeners: (listener) => set((state) => {
    state.eventListeners.push(listener);
    return { eventListeners: state.eventListeners };
  }),
  /**
   * Removes an event listener from the list of keyboard event listeners.
   * @param listener - The event listener to remove.
   */
  removeEventListeners: (listener) => set((state) => {
    state.eventListeners = state.eventListeners.filter((l) => l !== listener);
    return { eventListeners: state.eventListeners };
  }),
  /**
   * Clears all event listeners from the list of keyboard event listeners.
   */
  clearAllEventListeners: () => set((state) => {
    state.eventListeners = [];
    return { eventListeners: state.eventListeners };
  }),

  // Derived bundle functions
  /**
   * Triggers the onKeyPress event for all registered listeners.
   * @param key - The key that was pressed.
   */
  onKeyPress: (key) => {
    for (const listener of get().eventListeners) {
      listener.onKeyPress(key);
    }
  },
  /**
   * Triggers the onBackspace event for all registered listeners.
   */
  onBackspace: () => {
    for (const listener of get().eventListeners) {
      listener.onBackspace();
    }
  },
  /**
   * Triggers the onHide event for all registered listeners.
   */
  onHide: () => {
    for (const listener of get().eventListeners) {
      listener.onHide();
    }
  },
  /**
   * Triggers the onSearch event for all registered listeners.
   */
  onSearch: () => {
    for (const listener of get().eventListeners) {
      listener.onSearch();
    }
  },

  // Visibility
  visible: false,
  /**
   * Sets the visibility of the keyboard.
   * @param isVisible - Boolean indicating whether the keyboard should be visible.
   */
  setIsVisible: (isVisible) => set({ visible: isVisible }),
  /**
   * Toggles the visibility of the keyboard.
   */
  toggleVisibility: () => set((state) => ({ visible: !state.visible })),
}));

export default useKeyboardStore;
