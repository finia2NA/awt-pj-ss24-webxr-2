import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getWholeDataAsJson } from '../src/lib/io/getter.ts';

test('the upgraded XML parser preserves DVB-I attributes, text and repeated entries', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(`<ServiceList><Service priority="2"><Name>News &amp; Culture</Name></Service><Service priority="1"><Name>Sports</Name></Service></ServiceList>`));
  const data = await getWholeDataAsJson('https://fixture.invalid/services');
  assert.equal(data.ServiceList.Service.length, 2);
  assert.equal(data.ServiceList.Service[0]['@_priority'], 2);
  assert.equal(data.ServiceList.Service[0].Name, 'News & Culture');
});
