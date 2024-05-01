import { LCNTable } from "./lcnTable";
import DVBI from "..";

describe('LCNTable', () => {
  const dvbi = new DVBI();

  beforeAll(async () => {
    await dvbi.init();
  });

  test('LCN Table Constructor with no region', () => {
    const lcnTable = new LCNTable(dvbi);
    expect(lcnTable).toBeDefined();
  });
});