export function getISOWeek(date: Date): number {
  // Copy date object to avoid modifying original
  const tempDate = new Date(date.getTime());

  // Set to nearest Thursday: current date + 3 days
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  // January 4 is always in week 1
  const firstThursday = new Date(tempDate.getFullYear(), 0, 4);

  // Number of weeks between firstThursday and the current date
  return Math.ceil(
    ((tempDate.getTime() - firstThursday.getTime()) / 86400000 + 1) / 7
  );
}
