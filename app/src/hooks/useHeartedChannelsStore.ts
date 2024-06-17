/* eslint-disable no-unused-vars */

import create from 'zustand';

interface HeartedChannelsState {
  heartedChannels: Set<string>;
  removeHeartedChannelByID: (channelID: string) => void;
  addHeartedChannelByID: (channelID: string) => void;
  toggleHeartedChannelByID: (channelID: string) => void;
}

const useHeartedChannelsStore = create<HeartedChannelsState>((set) => ({
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
}));

export default useHeartedChannelsStore;
