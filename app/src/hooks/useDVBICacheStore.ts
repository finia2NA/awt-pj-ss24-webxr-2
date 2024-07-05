/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand';


interface ServiceListKey {
  includeIncomplete?: boolean;
  includeGuide?: boolean;
  guideStart?: number;
  guideEnd?: number;
}

export interface ServiceStore {
  cache: null,
  setCache: (value: any) => void,
  getCache: () => any,
}


const useServiceStore = create<ServiceStore>((set, get) => ({
  cache: null,
  setCache: (value: any) => set({ cache: value }),
  getCache: () => get().cache,
}));

export default useServiceStore;