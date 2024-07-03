/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { useServiceList } from "./useDVBI";

export enum Route {
  HOME = 'home',
  TV = 'tv',
  GUIDE = 'guide',
  SETTINGS = 'settings',
}


export interface RoutingStore {
  route: Route;
  setRoute: (route: Route) => void;

  tunedChannel: string | null;
  setTunedChannel: (channel: string) => void;
}

const useRoutingStore = create<RoutingStore>((set) => {
  // TODO: get this from the API, not hardcoded
  const firstService = "tag:mitxp.com,2021:1.1019.10301";

  return {
    route: Route.HOME,
    setRoute: (route: Route) => set({ route }),

    tunedChannel: firstService ? firstService : null,
    setTunedChannel: (channel: string) => set({ tunedChannel: channel }),
  };
});


export default useRoutingStore;