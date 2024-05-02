import DVBI from "../dvbi";
import { Region } from './regions';

/**
 * Represents an LCN (Logical Channel Number).
 * This class is used to store the channel number and service ID of a channel.
 */
class LCN {
  public channelNumber: number;
  public serviceID: string;

  private dvbi: DVBI = DVBI.getInstance();

  constructor(channelNumber: number, serviceID: string) {
    this.channelNumber = channelNumber;
    this.serviceID = serviceID;
  }


  // TODO: resolve name from serviceID and dvbi
}

/**
 * Represents an LCN (Logical Channel Number) table.
 */
class LCNTable {
  public targetRegion?: string;
  public LCN: LCN[];

  private dvbi: DVBI = DVBI.getInstance();

  /**
   * Constructs the LCNTable for a region.
   * @param targetRegion - The region for which to create the LCNTable. If null, the generic LCNTable is used.
   */
  constructor(targetRegion: Region = null) {
    const LCNTablesData = this.dvbi.data.ServiceList.LCNTableList.LCNTable;
    // Get the LCNTable for this region
    let matchingTable = !targetRegion ? null : LCNTablesData.find((table) => table["TargetRegion"] === targetRegion.id);
    // If there is no LCNTable for this region, get the generic one
    if (matchingTable) {
      // If there is a matching table set the targetRegion appropriately
      this.targetRegion = matchingTable["TargetRegion"];
    } else {
      // else use the generic table, which has no targetRegion
      matchingTable = LCNTablesData.find((table) => !table["TargetRegion"]);
      this.targetRegion = null; // TODO: think about if null is a good signifier for the generic LCNTable
    }

    // Create the LCN objects
    this.LCN = [];
    for (let lcndata of matchingTable.LCN) {
      const newLCN = new LCN(lcndata["@_channelNumber"], lcndata["@_serviceRef"]);
      this.LCN.push(newLCN);
    }
    this.LCN.sort((a, b) => a.channelNumber - b.channelNumber);
  }

}

export { LCNTable };