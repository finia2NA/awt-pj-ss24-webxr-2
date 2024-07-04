function getDateISO(date: Date) {
    return date.toISOString().split('T')[0];
}

function alterDateDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

export { getDateISO, alterDateDays };