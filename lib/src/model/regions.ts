import DVBI from "../dvbi";
import { LCNTable } from "./lcnTable";

/**
 * Retrieves the regions from a DVBI object.
 * 
 * @param DVBI - The DVBI object containing the region data.
 * @returns A RegionContainer object containing the regions.
 */
function getRegionsFromDVBI(DVBI: DVBI): RegionContainer {
  const rawRegions = DVBI.data.ServiceList.RegionList.Region;

  const regions = new RegionContainer([]);
  for (let region of rawRegions) {
    const name = region.RegionName;
    const id = region["@_regionID"];
    const postcodes = [];
    for (let pcRange of region.PostcodeRange) {
      const range = new postcodeRange();
      range.start = pcRange["@_from"];
      range.end = pcRange["@_to"];
      postcodes.push(range);
    }

    regions.array.push(new Region(DVBI, name, postcodes, id));
  }
  return regions;
}

/**
 * Represents a container for regions.
 */
class RegionContainer {
  public array: Region[];

  /**
   * Creates a new instance of the RegionContainer class.
   * @param regions - An array of Region objects.
   */
  constructor(regions: Region[]) {
    this.array = regions;
  }

  /**
   * Retrieves the region associated with the given postcode.
   * @param postcode - The postcode to search for.
   * @returns The Region object associated with the given postcode, or null if no matching region is found.
   */
  getRegionFromPostcode(postcode: number): Region {
    for (let region of this.array) {
      for (let pcRange of region.postcodes) {
        if (postcode >= pcRange.start && postcode <= pcRange.end) {
          return region;
        }
      }
    }
    return null;
  }
}

/**
 * Represents a range of postcodes.
 */
class postcodeRange {
  public start: number;
  public end: number;
}

/**
 * Represents a region.
 */
class Region {
  public name: string;
  public postcodes: postcodeRange[];
  public id: string;

  private DVBI: DVBI; // DVBI is stored to enable further queries starting at this region

  /**
   * Creates a new instance of the Region class.
   * @param DVBI - The DVBI object.
   * @param name - The name of the region.
   * @param postcodes - The postcode ranges of the region.
   * @param id - The ID of the region.
   */
  constructor(DVBI: DVBI, name: string, postcodes: postcodeRange[], id: string) {
    this.DVBI = DVBI;
    this.name = name;
    this.postcodes = postcodes;
    this.id = id;
  }

  /**
   * Gets the LCNTable object for the region.
   * @returns The LCNTable object.
   */
  getLCNTable() {
    // Create the Table object
    const lcnTable = new LCNTable(this.DVBI, this);
    return lcnTable;
  }
}

export { Region, getRegionsFromDVBI };