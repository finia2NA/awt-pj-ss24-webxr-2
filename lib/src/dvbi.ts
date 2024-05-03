import { getWholeDataAsJson } from "./io/getter";
import { getLcnTables } from "./model/lcnTables";
import { RegionContainer, getRegions } from "./model/regions";
import { getServices } from "./model/services";

/**
 * The DVBI class represents a singleton instance of the DVBI (Digital Video Broadcasting Interface) module.
 * It provides methods to initialize and refresh data, as well as retrieve services and regions.
 * (More functions coming soon)
 */
class DVBI {
  // Internal vars
  private static instance: DVBI;
  rawData: any;
  apiURL: string;

  // Vars to be accessed from outside
  public regions: RegionContainer;
  public lcnTables: any; // TODO: Define the LCN Table type
  public services: any; // TODO: Define the service type




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
      // Like this it needs a bit more thinking on the developer's part that they need to call init() the first time they get the instance in the app.
      // await DVBI.instance.init();
    }
    return DVBI.instance;
  }

  /**
   * Initializes the DVBI instance by refreshing the data.
   * This method needs to be called at least once before using DVBI functionality.
   */
  public async init(apiURL: string) {
    this.apiURL = apiURL;
    await this.refreshData();
  }

  /**
   * Refreshes the data of the DVBI instance by fetching the whole data as JSON and then updating state.
   */
  public async refreshData() {
    const data = await getWholeDataAsJson(this.apiURL);
    this.rawData = data;

    // Begin parsing the data
    // Step 1: Extract the regions
    this.regions = getRegions();

    // Step 2: Extract the LCN Tables
    this.lcnTables = getLcnTables();
    // Step 2a: create links between LCN Tables and regions
    for (let region of this.regions.array) {
      for (let lcnTable of this.lcnTables) {
        if (lcnTable.targetRegion === region.id) {
          region.lcnTable = lcnTable;
          lcnTable.region = region;
        }
      }
    }

    // Step 3: Extract the services
    this.services = getServices();

    // Step 3a: create links between services and LCN Tables
    // NOTE: this step does the equals check Services * (Services * LCN Tables) times.
    // In our case that is 48.672 times.
    // This takes 2ms. Is that bad? I don't think so. For reference, a frame in a 60fps video is 16ms.
    // Still, could consider doing this as-needed if deemed to be a performance bottleneck.
    for (let service of this.services) {
      for (let lcnTable of this.lcnTables) {
        for (let lcn of lcnTable.LCN) {
          if (lcn.serviceRef === service.serviceID) {
            service.lcns.push(lcn);
            lcn.service = service;
          }
        }
      }
    }
  }
}

export default DVBI;