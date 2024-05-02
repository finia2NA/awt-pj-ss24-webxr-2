import { getWholeDataAsJson } from "./io/getter";
import { getRegions } from "./model/regions";

/**
 * The DVBI class represents a singleton instance of the DVBI (Digital Video Broadcasting Interface) module.
 * It provides methods to initialize and refresh data, as well as retrieve services and regions.
 * (More functions coming soon)
 */
class DVBI {
  private static instance: DVBI;
  data: any;

  private constructor() {
    // Note: You need to call init() after creating a new DVBI object to get the data
  }

  /**
   * Returns the singleton instance of the DVBI class.
   * If an instance does not exist, a new one is created.
   * @returns The DVBI instance.
   */
  public static getInstance(): DVBI {
    if (!DVBI.instance) {
      DVBI.instance = new DVBI();

      // NOTE: I could do the init here, but then every time getInstance is called, that will have to be in an async function, which is annoying.
      // Like this it needs a bit more thinking on the developer's part that they need to call init() the first time they get the instance.
      // await DVBI.instance.init();
    }
    return DVBI.instance;
  }

  /**
   * Initializes the DVBI instance by refreshing the data.
   * This method needs to be called at least once before using DVBI functionality.
   */
  public async init() {
    await this.refreshData();
  }

  /**
   * Refreshes the data of the DVBI instance by fetching the whole data as JSON.
   */
  public async refreshData() {
    const data = await getWholeDataAsJson();
    this.data = data;
  }

  /**
   * Retrieves the services available in the specified region.
   * If no region is provided, the services for the generic default region are retrieved.
   * @param region - The region for which to retrieve the services.
   * @returns An array of services.
   */
  public getServices(region: string = null) {
    throw new Error("Not implemented yet");
  }

  /**
   * Retrieves the regions available in the DVBI data.
   * @returns An array of regions.
   */
  public getRegions() {
    return getRegions();
  }

  /**
   * Retrieves the region associated with the specified postcode.
   * @param postcode - The postcode for which to retrieve the region.
   * @returns The region associated with the postcode.
   */
  public getRegionFromPostcode(postcode: string) {
    throw new Error("Not implemented yet");
  }
}

export default DVBI;