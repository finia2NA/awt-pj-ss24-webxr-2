import DVBI from "../dvbi";
import { Region, getRegions } from "./regions";

const url = process.env.API_URL;

describe("regions", () => {
  let dvbi: DVBI = DVBI.getInstance();

  beforeAll(async () => {
    await dvbi.init(url);
  });

  test("getRegionsFromDVBI should return a list of regions including Düsseldorf", () => {
    const regions = dvbi.regions;
    expect(regions).toBeDefined();
    expect(regions).toContainEqual(expect.objectContaining({ name: "Düsseldorf" }));
  });

  test("getRegionFromPostcode should return Köln for 50667", () => {
    const regions = dvbi.regions;
    const region = regions.getRegionFromPostcode(50667);
    expect(region).toBeDefined();
    expect(region.name).toBe("Köln");
  });

  test("ZDF Neo should be channel number 43 in Düsseldorf", () => {
    const regions = dvbi.regions;
    const region = regions.find((region) => region.name === "Düsseldorf");
    expect(region).toBeDefined();

    const lcnTable = region.lcnTable;
    const zdfNeo = lcnTable.LCN.find((lcn) => lcn.serviceRef === 'tag:zdf.de,2020:zdfneo');
    expect(zdfNeo).toBeDefined();
    expect(zdfNeo.channelNumber).toBe(43);
  });

});
