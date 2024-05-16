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

  test("Tagesschau should be on ARD at 9am", async () => {
    const contentGuide = await service.getContentGuide(
      new Date('2022-09-08T09:00:00'),
      new Date('2022-09-08T09:05:00')
    );
    expect(contentGuide.programDescriptions[0].title).toBe("Tagesschau");
  });

  test("getContent should return current and next program", async () => {
    const contentGuide = await service.getContentGuide();
    expect(contentGuide.programDescriptions.length).toBe(2);
  });

});