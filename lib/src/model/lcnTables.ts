import DVBI from "../dvbi";
import { Region, RegionContainer } from './regions';
import { Service } from "./services";

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
  public serviceRef: string; // The service ID as a string

  public containedInLCNTable: LCNTable;
  public service?: Service;


  constructor(channelNumber: number, serviceID: string, containingLcnTable: LCNTable) {
    this.channelNumber = channelNumber;
    this.serviceRef = serviceID;
    this.containedInLCNTable = containingLcnTable;
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
      const newLCN = new LCN(lcndata["@_channelNumber"], lcndata["@_serviceRef"], this);
      this.LCN.push(newLCN);
    }
    this.LCN.sort((a, b) => a.channelNumber - b.channelNumber);
  }

}

export { LCNTable, getLcnTables, LCN };