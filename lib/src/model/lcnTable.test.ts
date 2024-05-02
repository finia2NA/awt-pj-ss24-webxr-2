import DVBI from "../dvbi";
import { LCNTable } from "./lcnTable";

describe('LCNTable', () => {
  let dvbi: DVBI = DVBI.getInstance();

  beforeAll(async () => {
    await dvbi.init();
  });

  test('the dvbi should have a list of LCN tables', () => {
    const lcnTables = dvbi.lcnTables;
    expect(lcnTables).toBeDefined();
    expect(lcnTables.length).toBeGreaterThan(0);
  });

  test('the first LCN table should have a target region of "Düsseldorf"', () => {
    const lcnTables = dvbi.lcnTables;
    const lcnTable = lcnTables.find(table => table.targetRegion === "Düsseldorf");
    expect(lcnTable).toBeDefined();
  });

  test('the first LCN table should have a list of LCN entries', () => {
    const lcnTables = dvbi.lcnTables;
    const lcnTable = lcnTables[0];
    expect(lcnTable.LCN).toBeDefined();
    expect(lcnTable.LCN.length).toBeGreaterThan(0);
  });

  test('the LCN table should have one generic table', () => {
    const lcnTables = dvbi.lcnTables;
    const lcnTable = lcnTables.find(table => !table.targetRegion);
    expect(lcnTable).toBeDefined();
  });

  test('the lcn table for a region should have a region object', () => {
    const lcnTables = dvbi.lcnTables;
    const lcnTable = lcnTables.find(table => table.region);
    expect(lcnTable).toBeDefined();
    expect(lcnTable.region).toBeDefined();
  });
});