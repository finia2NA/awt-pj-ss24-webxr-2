import DVBI from ".";

const url = process.env.API_URL;

describe("DVBI", () => {

  beforeAll(async () => {
    await DVBI.getInstance().init(url);
  });



  it("should be defined", () => {
    expect(DVBI).toBeDefined();
  });

  it("should have a refreshData method", () => {
    const dvbi = DVBI.getInstance();
    expect(dvbi.refreshData).toBeDefined();
  });

  // after construction, the data should be not null
  it("should have data after init call", async () => {
    debugger;
    const dvbi = DVBI.getInstance();
    debugger;
    expect(dvbi.rawData).toBeDefined();
    debugger;
  });

});
