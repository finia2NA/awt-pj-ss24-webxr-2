import DVBI from "../dvbi";
import { LCNTable } from "./lcnTable";

/**
 * Retrieves the regions from stored data.
 * 
 * @returns A RegionContainer object containing the regions.
 */
function getRegions(): RegionContainer {
  const dvbi = DVBI.getInstance();

  const rawRegions = dvbi.data.ServiceList.RegionList.Region;

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

    regions.array.push(new Region(name, postcodes, id));
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

export { Region, getRegions };