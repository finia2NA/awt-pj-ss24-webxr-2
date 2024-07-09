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

const useRecentChannelsStore = create<RecentChannelsState>()(
  persist(
    (set, get) => ({
      recentChannels: [],
      /**
       * Adds a channel to the front of the list of recently watched channels. If the channel is already in the list, it is moved to the front.
       * If the list exceeds the set number of channels, the oldest channel is removed.
       * @param channelID The ID of the channel to add to the list.
       */
      addRecentChannelToFrontByID: (channelID: string) => set((state) => {
        const updatedChannels = [channelID, ...state.recentChannels.filter((id) => id !== channelID)];
        while (updatedChannels.length > maxStoredChannels) {
          updatedChannels.pop();
        }
        return { recentChannels: updatedChannels };
      }),
      removeRecentChannelByID: (channelID: string) => set((state) => ({
        recentChannels: state.recentChannels.filter((id) => id !== channelID),
      })),
      getIndexByID: (channelID: string) => {
        const index = get().recentChannels.indexOf(channelID);
        return index >= 0 ? index : null;
      },
    }),
    {
      name: 'recently-watched-channels-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRecentChannelsStore;