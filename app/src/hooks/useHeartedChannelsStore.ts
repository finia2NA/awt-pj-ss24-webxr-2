/**
 * This file contains the zustand hook for managing a list of hearted channels.
 */

/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Interface defining the structure of the Hearted Channels State.
 */
interface HeartedChannelsState {
  heartedChannels: Set<string>;
  removeHeartedChannelByID: (channelID: string) => void;
  addHeartedChannelByID: (channelID: string) => void;
  toggleHeartedChannelByID: (channelID: string) => void;
  hasHeartedChannelByID: (channelID: string) => boolean;
}

/**
 * Zustand store for managing a list of hearted channels.
 * The state is persisted in localStorage.
 */
const useHeartedChannelsStore = create<HeartedChannelsState>()(
  persist(
    (set, get) => ({
      heartedChannels: new Set<string>(),
      /**
       * Removes a channel from the list of hearted channels by its ID.
       * @param channelID - The ID of the channel to remove.
       */
      removeHeartedChannelByID: (channelID: string) => set((state) => {
        state.heartedChannels.delete(channelID);
        return { heartedChannels: new Set(state.heartedChannels) };
      }),
      /**
       * Adds a channel to the list of hearted channels by its ID.
       * @param channelID - The ID of the channel to add.
       */
      addHeartedChannelByID: (channelID: string) => set((state) => {
        state.heartedChannels.add(channelID);
        return { heartedChannels: new Set(state.heartedChannels) };
      }),
      /**
       * Toggles the hearted state of a channel by its ID.
       * @param channelID - The ID of the channel to toggle.
       */
      toggleHeartedChannelByID: (channelID: string) => set((state) => {
        if (state.heartedChannels.has(channelID)) {
          state.heartedChannels.delete(channelID);
        } else {
          state.heartedChannels.add(channelID);
        }
        return { heartedChannels: new Set(state.heartedChannels) };
      }),
      /**
       * Checks if a channel is hearted by its ID.
       * @param channelID - The ID of the channel to check.
       * @returns True if the channel is hearted, false otherwise.
       */
      hasHeartedChannelByID: (channelID: string) => {
        return get().heartedChannels.has(channelID);
      },
    }),
    {
      name: 'hearted-channels-storage', // Name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      // Custom serialize/deserialize functions for state, since the default ones don't work with Sets
      serialize: (state) => JSON.stringify({
        ...state,
        state: {
          ...state.state,
          heartedChannels: Array.from(state.state.heartedChannels),
        },
      }),
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          ...parsed,
          state: {
            ...parsed.state,
            heartedChannels: new Set(parsed.state.heartedChannels),
          },
        };
      },
    }
  )
);

export default useHeartedChannelsStore;
