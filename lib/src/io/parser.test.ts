import { getWholeDataAsJson } from './getter';

test('DVB-I XML retains numeric attributes and decoded text', async () => {
  const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(
    '<ServiceList><Service priority="2"><Name>News &amp; Culture</Name></Service><Service priority="1"><Name>Sports</Name></Service></ServiceList>'
  ));
  try {
    const data = await getWholeDataAsJson('https://fixture.invalid/services');
    expect(data.ServiceList.Service).toHaveLength(2);
    expect(data.ServiceList.Service[0]['@_priority']).toBe(2);
    expect(data.ServiceList.Service[0].Name).toBe('News & Culture');
  } finally { fetchMock.mockRestore(); }
});
