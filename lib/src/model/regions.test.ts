import DVBI from "..";
import { Region, getRegionsFromDVBI } from "./regions";

describe("regions", () => {
  const dvbi = new DVBI();

  beforeAll(async () => {
    await dvbi.init();
  });

  test("getRegionsFromDVBI should return a list of regions including Düsseldorf", () => {
    const regions = getRegionsFromDVBI(dvbi);
    expect(regions).toBeDefined();
    expect(regions.array).toContainEqual(expect.objectContaining({ name: "Düsseldorf" }));
  });

  test("getRegionFromPostcode should return Köln for 50667", () => {
    const regions = getRegionsFromDVBI(dvbi);
    const region = regions.getRegionFromPostcode(50667);
    expect(region).toBeDefined();
    expect(region.name).toBe("Köln");
  });

  test("ZDF Neo should be channel number 43 in Düsseldorf", () => {
    const regions = getRegionsFromDVBI(dvbi);
    const region = regions.array.find((region) => region.name === "Düsseldorf");
    expect(region).toBeDefined();

    const lcnTable = region.getLCNTable();
    const zdfNeo = lcnTable.LCN.find((lcn) => lcn.serviceID === 'tag:zdf.de,2020:zdfneo');
    expect(zdfNeo).toBeDefined();
    expect(zdfNeo.channelNumber).toBe(43);
  });
  
});
