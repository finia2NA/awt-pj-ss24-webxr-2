// Note: this type is WIP.
// Additionally, I think we should not use the json that comes from the parser directly, but rather convert it to a more structured format.

interface Region {
  RegionName: string;
  PostcodeRange: Array<string>; // NOTE: In the API, these strings are empty.
}

interface RegionList {
  Region: Region[];
}

interface LCNTable {
  TargetRegion: string;
  LCN: string[];
}

interface LCNTableList {
  LCNTable: Array<string | LCNTable>; // NOTE: in the data, the first entry is an array of empty strings, the rest are objects.
}

interface ServiceList {
  Name: string;
  ProviderName: string;
  RegionList: RegionList
  LCNTableList: LCNTableList;
}

interface Data {
  "?xml": string
  ServiceList: ServiceList;
}

export type { Data };
