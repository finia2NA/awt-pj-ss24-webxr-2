import { XMLParser } from "fast-xml-parser";

const options = {
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  parseAttributeValue: true,
}

const parser = new XMLParser(options);

async function getWholeDataAsJson(url: string) {
  const response = await fetch(url);
  const xml = await response.text();

  const jObj = parser.parse(xml);

  return jObj;
}

export { getWholeDataAsJson as getWholeDataAsJson };
