/* eslint-disable no-unused-vars */
import create from 'zustand';

interface ServiceListCacheKey {
  includeIncomplete: boolean;
  includeGuide: boolean;
  guideStart?: Date;
  guideEnd?: Date;
}

export interface ServiceListCacheStore {
  cache: Record<string, any>;
  setCache: (key: ServiceListCacheKey, value: any) => void;
  getCache: (key: ServiceListCacheKey) => any;
}

const serializeServiceListKey = (key: ServiceListCacheKey) => JSON.stringify(key);

export const useServiceListCacheStore = create<ServiceListCacheStore>((set, get) => ({
  cache: {},
  setCache: (key, value) => set((state) => ({
    cache: {
      ...state.cache,
      [serializeServiceListKey(key)]: value,
    }
  })),
  getCache: (key) => {
    const state = get();
    return state.cache[serializeServiceListKey(key)];
  },
}));


export interface DVBICacheKey {
  url: string;
}

export interface DVBICacheStore {
  cache: Record<string, any>;
  setCache: (key: DVBICacheKey, value: any,) => void;
  getCache: (key: DVBICacheKey) => any;
}

const serializeDVBIKey = (key: DVBICacheKey) => JSON.stringify(key);

export const useDVBICacheStore = create<DVBICacheStore>((set, get) => ({
  cache: {},
  setCache: (key, value) => set((state) => ({
    cache: {
      ...state.cache,
      [serializeDVBIKey(key)]: value,
    }
  })),
  getCache: (key) => {
    const state = get();
    return state.cache[serializeDVBIKey(key)];
  },
}));