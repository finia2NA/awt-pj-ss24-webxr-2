import DVBI from ".";

describe("DVBI", () => {
  it("should be defined", () => {
    expect(DVBI).toBeDefined();
  });

  it("should have a refreshData method", () => {
    const dvbi = new DVBI();
    expect(dvbi.refreshData).toBeDefined();
  });

  // after construction, the data should be not null
  it("should have data after init call", async () => {
    const dvbi = new DVBI();
    await dvbi.init();
    expect(dvbi.data).toBeDefined();
  });

});