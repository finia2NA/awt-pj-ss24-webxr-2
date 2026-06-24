import DVBI from "../dvbi";
import { LCNTable } from "./lcnTables";
import { castToArray } from "../utils/utils";

/**
 * Retrieves the regions from stored data.
 * 
 * @returns A RegionContainer object containing the regions.
 */
function getRegions(): RegionContainer {
  const dvbi = DVBI.getInstance();

  const rawRegions = flattenRegions(dvbi.rawData.ServiceList.RegionList.Region);

  const regions = new RegionContainer();
  for (let region of rawRegions) {
    const name = region.RegionName;
    const id = region["@_regionID"];
    const postcodes = [];
    for (let pcRange of castToArray(region.PostcodeRange)) {
      const range = new postcodeRange();
      range.start = pcRange["@_from"];
      range.end = pcRange["@_to"];
      postcodes.push(range);
    }

    regions.push(new Region(name, postcodes, id));
  }
  return regions;
}

function flattenRegions(rawRegions: any): any[] {
  const result = [];

  for (let region of castToArray(rawRegions)) {
    result.push(region);
    result.push(...flattenRegions(region.Region));
  }

  return result;
}

/**
 * Represents a container for regions. Extends the Array class and can therefore be used as an array
 * of Region objects but also provides additional functionality.
 */
class RegionContainer extends Array<Region> {
  /**
   * Creates a new instance of the RegionContainer class.
   * @param regions - An array of Region objects.
   */
  constructor(...regions: Region[]) {
    super(...regions);
  }

  /**
   * Retrieves the region associated with the given postcode.
   * @param postcode - The postcode to search for.
   * @returns The Region object associated with the given postcode, or null if no matching region is found.
   */
  getRegionFromPostcode(postcode: number): Region | null {
    for (let region of this) {
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
  public lcnTable: LCNTable;

  private dvbi: DVBI = DVBI.getInstance();

  /**
   * Creates a new instance of the Region class.
   * @param name - The name of the region.
   * @param postcodes - The postcode ranges of the region.
   * @param id - The ID of the region.
   */
  constructor(name: string, postcodes: postcodeRange[], id: string) {
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
    const lcnTable = new LCNTable(this);
    return lcnTable;
  }
}

export { RegionContainer, Region, getRegions };
