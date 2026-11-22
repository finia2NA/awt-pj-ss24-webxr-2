// Tests are deliberately offline: unknown requests fail instead of reaching a service.
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
process.env.API_URL = 'https://fixture.invalid/services';
const services = readFileSync(resolve(__dirname, 'src/fixtures/services.xml'), 'utf8');
const guide = `<TVAMain><ProgramDescription><ProgramInformationTable>${[1, 2].map(id => `
<ProgramInformation programId="crid://test/${id}"><BasicDescription><Title type="main">Programme ${id}</Title><Synopsis length="short">Offline programme</Synopsis></BasicDescription></ProgramInformation>`).join('')}
</ProgramInformationTable><ProgramLocationTable><Schedule>${[1, 2].map(id => `
<ScheduleEvent><Program crid="crid://test/${id}"/><PublishedStartTime>2026-11-22T1${id}:00:00Z</PublishedStartTime><PublishedDuration>PT1H</PublishedDuration></ScheduleEvent>`).join('')}
</Schedule></ProgramLocationTable></ProgramDescription></TVAMain>`;
global.fetch = async input => {
  const url = new URL(String(input).trim());
  if (url.href === process.env.API_URL) return new Response(services);
  if (url.origin === 'https://fixture.invalid' && url.pathname === '/guide') {
    return new Response(url.searchParams.has('start') ? '<TVAMain/>' : guide);
  }
  throw new Error(`Unexpected test request: ${url}`);
};
