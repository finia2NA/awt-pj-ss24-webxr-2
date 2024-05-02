import DVBI from ".";

describe("DVBI", () => {
  it("should be defined", () => {
    expect(DVBI).toBeDefined();
  });

  it("should have a refreshData method", () => {
    const dvbi = DVBI.getInstance();
    expect(dvbi.refreshData).toBeDefined();
  });

  // after construction, the data should be not null
  it("should have data after init call", async () => {
    const dvbi = DVBI.getInstance();
    await dvbi.init();
    expect(dvbi.rawData).toBeDefined();
  });

});