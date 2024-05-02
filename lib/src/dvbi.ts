import { getWholeDataAsJson } from "./io/getter";
import { getRegionsFromDVBI } from "./model/regions";

class DVBI {
  private static instance: DVBI;
  data: any;

  private constructor() {
    // Note: You need to call init() after creating a new DVBI object to get the data
  }

  public static getInstance(): DVBI {
    if (!DVBI.instance) {
      DVBI.instance = new DVBI();

      // NOTE: I could do the init here, but then every time getInstance is called, that will have to be in an async function, which is annoying.
      // Like this it needs a bit more thinking on the developer's part that they need to call init() the first time they get the instance.
      // await DVBI.instance.init();
    }
    return DVBI.instance;
  }

  public async init() {
    await this.refreshData();
  }

  public async refreshData() {
    const data = await getWholeDataAsJson();
    this.data = data;
  }

  public getServices(region: string = null) {
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