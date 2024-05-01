import config from './config.json';
import { Data } from './types/dataType';
const { XMLParser } = require("fast-xml-parser");

const options = {
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  parseAttributeValue: true,
}

const parser = new XMLParser(options);

async function getWholeDataAsJS() {
  const url = config.apiBaseUrl;
  const response = await fetch(url);
  const xml = await response.text();

  // NOTE: THE TYPE IS ONLY FOR SYNTACTIC SUGAR!
  // Since Typescript is transpiled to Javascript, the type is not enforced at runtime.
  // This is.. unfortunate, since it would help us catch errors, but.. it is what it is.
  const jObj: Data = parser.parse(xml);
  // const jObj = parser.parse(xml);

  // Could think about returning the ServiceList instead of the whole object, maybe TODO:
  return jObj;
}

export { getWholeDataAsJS };