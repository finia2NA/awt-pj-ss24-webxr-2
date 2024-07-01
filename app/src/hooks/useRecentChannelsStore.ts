/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RecentChannelsState {
  recentChannels: string[];
  addRecentChannelToFrontByID: (channelID: string) => void;
  removeRecentChannelByID: (channelID: string) => void;
  getIndexByID: (channelID: string) => number | null;
}

const useRecentChannelsStore = create<RecentChannelsState>()(
  persist(
    (set, get) => ({
      recentChannels: [],
      /**
       * Adds a channel to the front of the list of recently watched channels. If the channel is already in the list, it is moved to the front.
       * @param channelID The ID of the channel to add to the list.
       */
      addRecentChannelToFrontByID: (channelID: string) => set((state) => {
        return {
          recentChannels: [channelID, ...state.recentChannels.filter((id) => id !== channelID)],
        };
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
