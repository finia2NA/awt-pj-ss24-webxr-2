function getDateISO(date: Date) {
    return date.toISOString().split('T')[0];
}

function alterDateDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return (`${hours}:${minutes}`);
}

export { getDateISO, alterDateDays, formatTime };