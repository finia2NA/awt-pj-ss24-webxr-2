// Export the things you want to expose to the outside world here

import { getWholeDataAsJson } from "./io/getter";

class DVBI {
  data: any;

  constructor() {
    this.refreshData();
  }

  public refreshData() {
    this.data = getWholeDataAsJson();
  }

  /**
   * Returns a list of services for a given region.
   * @param region The region to get services for. If null, the generic list of services will be returned. Use getRegions() to get a list of regions.
   */
  public getServices(region: string = null) {
    // TODO: 1 note I wanted to make is that it would be nice to also append the data from the LCNTable to the service object.
    throw new Error("Not implemented yet");
  }

  public getRegions() {
    throw new Error("Not implemented yet");
  }

  public getRegionFromPostcode(postcode: string) {
    throw new Error("Not implemented yet");
  }


}

export default DVBI;