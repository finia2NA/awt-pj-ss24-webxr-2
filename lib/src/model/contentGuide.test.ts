import DVBI from "../dvbi";

const url = process.env.API_URL;
let service;

describe("contentGuide", () => {
  let dvbi: DVBI = DVBI.getInstance();

  beforeAll(async () => {
    await dvbi.init(url);
    const services = dvbi.services;
    service = services[0]; // ARD / "Das Erste HD"
  });

  test("current guide entries should have titles", async () => {
    const contentGuide = await service.getContentGuide();
    expect(contentGuide.programDescriptions.length).toBeGreaterThan(0);
    expect(contentGuide.programDescriptions[0].title).toBeTruthy();
  });

  test("There should be no program guide in pre-DVBI era", async () => {
    const contentGuide = await service.getContentGuide(
      new Date('1970-01-01T12:00:00Z'),
      new Date('1970-01-01T12:15:00Z')
    );
    expect(contentGuide.programDescriptions.length).toBe(0);
  });

  test("getContent should return current and next program", async () => {
    const contentGuide = await service.getContentGuide();
    expect(contentGuide.programDescriptions.length).toBe(2);
  });

});
