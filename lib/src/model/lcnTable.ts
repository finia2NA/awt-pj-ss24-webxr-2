import DVBI from "../dvbi";
import { Region, RegionContainer } from './regions';

function getLcnTables() {
  const dvbi = DVBI.getInstance();
  const LCNTablesData = dvbi.rawData.ServiceList.LCNTableList.LCNTable;

  const lcnTables = [];
  for (let lcnTable of LCNTablesData) {
    lcnTables.push(new LCNTable(lcnTable));
  }

  return lcnTables;
}


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


class LCNTable {
  public targetRegion?: string;

  public LCN: LCN[];
  public region: Region;

  constructor(rawLCNTable) {
    // Set the target region
    if (rawLCNTable["TargetRegion"]) {
      this.targetRegion = rawLCNTable["TargetRegion"];
    } else {
      this.targetRegion = null;
    }

    // Create the LCN objects
    this.LCN = [];
    for (let lcndata of rawLCNTable.LCN) {
      const newLCN = new LCN(lcndata["@_channelNumber"], lcndata["@_serviceRef"]);
      this.LCN.push(newLCN);
    }
    this.LCN.sort((a, b) => a.channelNumber - b.channelNumber);
  }

}

export { LCNTable, getLcnTables };