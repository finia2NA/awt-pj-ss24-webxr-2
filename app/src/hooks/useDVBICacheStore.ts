/**
 * This file contains the zustand hooks for caching service lists and DVBI.
 */

/* eslint-disable no-unused-vars */
import create from 'zustand';

/**
 * Interface defining the key for the Service List cache.
 */
interface ServiceListCacheKey {
  includeIncomplete: boolean;
  includeGuide: boolean;
  guideStart?: Date;
  guideEnd?: Date;
}

/**
 * Interface defining the structure of the Service List Cache Store.
 */
export interface ServiceListCacheStore {
  cache: Record<string, any>;
  setCache: (key: ServiceListCacheKey, value: any) => void;
  getCache: (key: ServiceListCacheKey) => any;
}

/**
 * Serializes the ServiceListCacheKey into a string.
 * @param key - The key to serialize.
 * @returns The serialized key as a string.
 */
const serializeServiceListKey = (key: ServiceListCacheKey) => JSON.stringify(key);

/**
 * Zustand store for managing a cache of service lists.
 */
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

/**
 * Interface defining the key for the DVBI cache.
 */
export interface DVBICacheKey {
  url: string;
}

/**
 * Interface defining the structure of the DVBI Cache Store.
 */
export interface DVBICacheStore {
  cache: Record<string, any>;
  setCache: (key: DVBICacheKey, value: any) => void;
  getCache: (key: DVBICacheKey) => any;
}

/**
 * Serializes the DVBICacheKey into a string.
 * @param key - The key to serialize.
 * @returns The serialized key as a string.
 */
const serializeDVBIKey = (key: DVBICacheKey) => JSON.stringify(key);

/**
 * Zustand store for managing a cache of DVBI content.
 */
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
