import { getWholeDataAsJson } from "./getter";

const url = process.env.API_URL;


describe('getter', () => {
  let data: any;

  beforeAll(async () => {
    // We're doing this here so we just have to do it once
    data = await getWholeDataAsJson(url);
  });

  test('data should be defined', () => {
    expect(data).toBeDefined();
  });

  test('data should have a service list of expected structure', () => {
    /**
     * We expect:
     * data
     * - ServiceList
     *   - Name
     *   - ProviderName
     *   - ContentGuideSourceList
     *     - ContentGuideSource[]
     *   - LCNTableList
     *     - LCNTable[]
     *   - RegionList
     *     - Region[]
     *   - Service[]
     */

    expect(data).toHaveProperty('ServiceList');

    expect(data.ServiceList).toHaveProperty('Name');
    expect(data.ServiceList).toHaveProperty('ProviderName');

    expect(data.ServiceList).toHaveProperty('ContentGuideSourceList');
    expect(data.ServiceList.ContentGuideSourceList).toHaveProperty('ContentGuideSource');
    expect(data.ServiceList.ContentGuideSourceList.ContentGuideSource).toBeInstanceOf(Array);

    expect(data.ServiceList).toHaveProperty('LCNTableList');
    expect(data.ServiceList.LCNTableList).toHaveProperty('LCNTable');
    expect(data.ServiceList.LCNTableList.LCNTable).toBeInstanceOf(Array);

    expect(data.ServiceList).toHaveProperty('RegionList');
    expect(data.ServiceList.RegionList).toHaveProperty('Region');
    expect(data.ServiceList.RegionList.Region).toBeInstanceOf(Array);

    expect(data.ServiceList).toHaveProperty('Service');
    expect(data.ServiceList.Service).toBeInstanceOf(Array);
  });
});
