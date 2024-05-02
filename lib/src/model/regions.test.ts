import DVBI from "../dvbi";
import { Region, getRegions } from "./regions";

describe("regions", () => {
  let dvbi: DVBI = DVBI.getInstance();

  beforeAll(async () => {
    await dvbi.init();
  });

  test("getRegionsFromDVBI should return a list of regions including Düsseldorf", () => {
    const regions = dvbi.regions;
    expect(regions).toBeDefined();
    expect(regions.array).toContainEqual(expect.objectContaining({ name: "Düsseldorf" }));
  });

  test("getRegionFromPostcode should return Köln for 50667", () => {
    const regions = dvbi.regions;
    const region = regions.getRegionFromPostcode(50667);
    expect(region).toBeDefined();
    expect(region.name).toBe("Köln");
  });

  test("ZDF Neo should be channel number 43 in Düsseldorf", () => {
    const regions = dvbi.regions;
    const region = regions.array.find((region) => region.name === "Düsseldorf");
    expect(region).toBeDefined();

    const lcnTable = region.lcnTable;
    const zdfNeo = lcnTable.LCN.find((lcn) => lcn.serviceID === 'tag:zdf.de,2020:zdfneo');
    expect(zdfNeo).toBeDefined();
    expect(zdfNeo.channelNumber).toBe(43);
  });

});
