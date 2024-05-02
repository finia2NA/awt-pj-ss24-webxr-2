import { getWholeDataAsJson } from "./io/getter";
import { getLcnTables } from "./model/lcnTable";
import { RegionContainer, getRegions } from "./model/regions";

/**
 * The DVBI class represents a singleton instance of the DVBI (Digital Video Broadcasting Interface) module.
 * It provides methods to initialize and refresh data, as well as retrieve services and regions.
 * (More functions coming soon)
 */
class DVBI {
  // Internal vars
  private static instance: DVBI;
  rawData: any;

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
    console.log("hey")
    

    // Step 3: Extract the services
    // Step 3a: create links between services and LCN Tables
  }
}

export default DVBI;