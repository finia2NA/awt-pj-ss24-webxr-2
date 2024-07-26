/**
 * This file contains a hook for doing the global routing and cannel selection in the app.
 * 
 * The architecture is as follows:
 * A lot of components have the oportunity to change the currently selected screen and tuned channel
 * (EG guide, channel list, channel number, home, tab bar.)
 * 
 * We want to avoid prop drilling, so we use a global store to manage the current route and tuned channel.
 * The app listens to this and displays the correct screen.
 * The TV view gets the tuned channel from this.
 */

/* eslint-disable no-unused-vars */
import { create } from "zustand";

/**
 * Enum representing the different routes in the application.
 */
export enum Route {
  HOME = "HOME",
  TV = "TV",
  GUIDE = "GUIDE",
  SETTINGS = "SETTINGS",
}

/**
 * Interface for the routing store, defining the state and actions.
 */
export interface RoutingStore {
  route: Route; // The current route of the application.
  setRoute: (route: Route) => void; // Function to set a new route.

  tunedChannel: string | null; // The currently tuned channel, or null if none.
  setTunedChannel: (channel: string) => void; // Function to set the tuned channel.
}

/**
 * Hook to use the routing store, which manages the application's routing state.
 */
const useRoutingStore = create<RoutingStore>((set) => {
  // TODO: get this from the API, not hardcoded
  const firstService = "tag:mitxp.com,2021:1.1019.10301";

  return {
    route: Route.HOME, // Initialize the route to the HOME route.
    setRoute: (route: Route) => set({ route }), // Update the route in the store.

    tunedChannel: firstService ? firstService : null, // Initialize the tuned channel.
    setTunedChannel: (channel: string) => set({ tunedChannel: channel }), // Update the tuned channel in the store.
  };
});

export default useRoutingStore;
