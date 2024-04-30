import config from './config.json';
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser();

async function getWholeDataAsJson() {
  const url = config.apiBaseUrl;
  const response = await fetch(url);
  const xml = await response.text();

  const jObj = parser.parse(xml);
  console.log(jObj);
  return jObj;
}

export { getWholeDataAsJson };