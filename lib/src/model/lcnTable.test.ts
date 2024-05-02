import DVBI from "../dvbi";
import { LCNTable } from "./lcnTable";

describe('LCNTable', () => {
  let dvbi: DVBI = DVBI.getInstance();

  beforeAll(async () => {
    await dvbi.init();
  });

  test('LCN Table Constructor with no region', () => {
    const lcnTable = new LCNTable(dvbi);
    expect(lcnTable).toBeDefined();
  });
});