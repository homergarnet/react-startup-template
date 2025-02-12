import { getISOWeek } from "./getISOWeek";

export function getCurrentYearWeekReducedByDays(
    days: number,
    thisYear: boolean
  ): string {
    const now = new Date();
    now.setDate(now.getDate() - days); // Subtract the specified number of days
    if (thisYear !== true) {
      now.setFullYear(now.getFullYear() - 1); // Subtract 1 year if thisYear is not true
    }
    const year = now.getFullYear();
    const week = getISOWeek(now);
  
    // Format the week number to be two digits
    const weekFormatted = week.toString().padStart(2, "0");
    return `${year}.${weekFormatted}`;
  }