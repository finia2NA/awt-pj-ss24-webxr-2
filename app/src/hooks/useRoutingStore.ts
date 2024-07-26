/**
 * This file contains hooks for doing the global routing and cannel selection in the app.
 * 
 * The tuned channel is persisted, but the route is not.
 * Thus, in reality there are 3 hooks here:
 * - useRoutingPartStore: simple, non-persisted routing store
 * - useChannelPartStore: persisted channel store
 * - useRoutingStore: combination of the above two
 * 
 * -----------------------------------------------------
 * 
 * The usage and architecture of this is as follows:
 * A lot of components have the oportunity to change the currently selected screen and tuned channel
 * (EG guide, channel list, channel number, home, tab bar.)
 * 
 * We want to avoid prop drilling, so we use a global store to manage the current route and tuned channel.
 * The app listens to this and displays the correct screen.
 * The TV view gets the tuned channel from this.
 */

/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Enum representing the different routes in the application.
 */
export enum Route {
  HOME = "HOME",
  TV = "TV",
  GUIDE = "GUIDE",
  SETTINGS = "SETTINGS",
}

interface RoutingPartStore {
  route: Route; // The current route of the application.
  setRoute: (route: Route) => void; // Function to set a new route.
}

interface ChannelPartStore {
  tunedChannel: string | null; // The currently tuned channel, or null if none.
  setTunedChannel: (channel: string) => void; // Function to set the tuned channel.
}

export interface RoutingStore extends RoutingPartStore, ChannelPartStore { }

/**
 * Hook to use the routing store, which manages the application's routing state.
 */
const useRoutingPartStore = create<RoutingPartStore>((set) => ({
  route: Route.HOME, // Initialize the route to the HOME route.
  setRoute: (route: Route) => set({ route }), // Update the route in the store.
}));

const useChannelPartStore = create<ChannelPartStore>()(
  persist(
    (set) => ({
      tunedChannel: "tag:zdf.de,2020:zdf",
      setTunedChannel: (channel: string) => set({ tunedChannel: channel }),
    }),
    {
      name: 'tuned-channel-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

const useRoutingStore = () => {
  const { route, setRoute } = useRoutingPartStore(state => state);
  const { tunedChannel, setTunedChannel } = useChannelPartStore(state => state);

  return {
    route,
    setRoute,
    tunedChannel,
    setTunedChannel
  };
}

export default useRoutingStore;