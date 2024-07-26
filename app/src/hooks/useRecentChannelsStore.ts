/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RecentChannelsState {
  recentChannels: string[];
  addRecentChannelToFrontByID: (channelID: string) => void;
  removeRecentChannelByID: (channelID: string) => void;
  getIndexByID: (channelID: string) => number | null;
}

const maxStoredChannels = 10;

/**
 * Custom hook to manage recent channels state.
 * The state is persisted in localStorage.
 * Provides methods to add, remove, and get the index of recently watched channels.
 */
const useRecentChannelsStore = create<RecentChannelsState>()(
  persist(
    (set, get) => ({
      recentChannels: [],

      /**
       * Adds a channel to the front of the list of recently watched channels.
       * If the channel is already in the list, it is moved to the front.
       * If the list exceeds the set number of channels, the oldest channels are removed.
       * @param channelID The ID of the channel to add to the list.
       */
      addRecentChannelToFrontByID: (channelID: string) => set((state) => {
        const updatedChannels = [channelID, ...state.recentChannels.filter((id) => id !== channelID)];
        while (updatedChannels.length > maxStoredChannels) {
          updatedChannels.pop();
        }
        return { recentChannels: updatedChannels };
      }),

      /**
       * Removes a channel from the list of recently watched channels by its ID.
       * @param channelID The ID of the channel to remove from the list.
       */
      removeRecentChannelByID: (channelID: string) => set((state) => ({
        recentChannels: state.recentChannels.filter((id) => id !== channelID),
      })),

      /**
       * Gets the index of a channel in the list of recently watched channels by its ID.
       * @param channelID The ID of the channel to find in the list.
       * @returns The index of the channel if found, otherwise null.
       */
      getIndexByID: (channelID: string) => {
        const index = get().recentChannels.indexOf(channelID);
        return index >= 0 ? index : null;
      },
    }),
    {
      name: 'recently-watched-channels-storage', // Name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // Storage mechanism to use (localStorage in this case)
    }
  )
);

export default useRecentChannelsStore;
