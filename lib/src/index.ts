// Export the things you want to expose to the outside world here

import { getWholeDataAsJson } from "./io/getter";
import { getRegionsFromDVBI } from "./model/regions";

class DVBI {
  // TODO: rn, it is possible to create 2 DVBI objects and have 2 different data sets. Solution could be to make it static or singleton.
  data: any;

  constructor() {
    // Note: You need to call init() after creating a new DVBI object to get the data
  }

  public async init() {
    await this.refreshData();
  }

  public async refreshData() {
    this.data = await getWholeDataAsJson();
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
    return getRegionsFromDVBI(this);
  }

  public getRegionFromPostcode(postcode: string) {
    throw new Error("Not implemented yet");
  }


}

export default DVBI;