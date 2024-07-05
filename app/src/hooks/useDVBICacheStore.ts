/* eslint-disable no-unused-vars */
import create from 'zustand';

interface ServiceListKey {
  includeIncomplete: boolean;
  includeGuide: boolean;
  guideStart?: Date;
  guideEnd?: Date;
}

export interface ServiceListStore {
  cache: Record<string, any>;
  setCache: (value: any, key: ServiceListKey) => void;
  getCache: (key: ServiceListKey) => any;
}

const serializeKey = (key: ServiceListKey) => JSON.stringify(key);

const useServiceStore = create<ServiceListStore>((set, get) => ({
  cache: {},
  setCache: (value, key) => set((state) => ({
    cache: {
      ...state.cache,
      [serializeKey(key)]: value,
    }
  })),
  getCache: (key) => {
    const state = get();
    return state.cache[serializeKey(key)];
  },
}));

export default useServiceStore;