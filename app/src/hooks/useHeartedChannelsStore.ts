/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface HeartedChannelsState {
  heartedChannels: Set<string>;
  removeHeartedChannelByID: (channelID: string) => void;
  addHeartedChannelByID: (channelID: string) => void;
  toggleHeartedChannelByID: (channelID: string) => void;
  hasHeartedChannelByID: (channelID: string) => boolean;
}

const useHeartedChannelsStore = create<HeartedChannelsState>()(
  persist(
    (set, get) => ({
      heartedChannels: new Set<string>(),
      removeHeartedChannelByID: (channelID: string) => set((state) => {
        state.heartedChannels.delete(channelID);
        return { heartedChannels: new Set(state.heartedChannels) };
      }),
      addHeartedChannelByID: (channelID: string) => set((state) => {
        state.heartedChannels.add(channelID);
        return { heartedChannels: new Set(state.heartedChannels) };
      }),
      toggleHeartedChannelByID: (channelID: string) => set((state) => {
        if (state.heartedChannels.has(channelID)) {
          state.heartedChannels.delete(channelID);
        } else {
          state.heartedChannels.add(channelID);
        }
        return { heartedChannels: new Set(state.heartedChannels) };
      }),
      hasHeartedChannelByID: (channelID: string) => {
        return get().heartedChannels.has(channelID);
      },
    }),
    {
      name: 'hearted-channels-storage', // name of the item in the storage (must be unique)
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
