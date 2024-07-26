/**
 * Converts a Date object to an ISO string and returns only the date part (YYYY-MM-DD).
 * 
 * @param {Date} date - The Date object to convert.
 * @returns {string} - The date in ISO format (YYYY-MM-DD).
 */
function getDateISO(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Alters the given Date object by adding or subtracting a specified number of days.
 * 
 * @param {Date} date - The original Date object.
 * @param {number} days - The number of days to add (can be negative to subtract days).
 * @returns {Date} - A new Date object with the altered date.
 */
function alterDateDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

/**
 * Formats the time part of a Date object into a string with the format HH:MM.
 * 
 * @param {Date} date - The Date object to format.
 * @returns {string} - The formatted time string (HH:MM).
 */
function formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return (`${hours}:${minutes}`);
}

export { getDateISO, alterDateDays, formatTime };
