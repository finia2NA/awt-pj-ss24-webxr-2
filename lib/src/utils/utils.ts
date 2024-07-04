/**
 * Casts the given data to an array if it is not already an array.
 * @param data The data to cast.
 * @returns The data as an array.
 */
function castToArray(data): any[] {
    return Array.isArray(data) ? data : [data];
}

/**
 * Parses a duration string (ISO 8601) into a Date object.
 * @param duration The duration string to parse.
 * @returns The Date object representing the duration.
 */
function parseDuration(duration): Date {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (match[1] ? parseInt(match[1]) : 0);
  const minutes = (match[2] ? parseInt(match[2]) : 0);
  const seconds = (match[3] ? parseInt(match[3]) : 0);

  return new Date(0, 0, 0, hours, minutes, seconds);
}

function parseDurationMinutes(duration): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (match[1] ? parseInt(match[1]) : 0);
  const minutes = (match[2] ? parseInt(match[2]) : 0);
  const seconds = (match[3] ? parseInt(match[3]) : 0);

  return hours * 60 + minutes + seconds / 60;
}

/**
 * Converts a Date object to a Unix timestamp.
 * @param date The date to convert.
 * @returns The Unix timestamp.
 * @see https://stackoverflow.com/a/11893157
 */
function convertDateToUnix(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export { castToArray, parseDuration, parseDurationMinutes, convertDateToUnix };