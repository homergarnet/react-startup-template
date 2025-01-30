// utils/dateUtils.ts

/**
 * Checks if a given year has 53 weeks according to ISO week date rules.
 * A year has 53 weeks if:
 * 1. It starts on a Thursday, or
 * 2. It ends on a Thursday and is a leap year.
 * 
 * @param year - The year to check. Defaults to the current year.
 * @returns true if the year supports 53 weeks, otherwise false.
 */
export const doesYearHave53Weeks = (year: number = new Date().getFullYear()): boolean => {
    const firstDayOfYear = new Date(year, 0, 1);
    const lastDayOfYear = new Date(year, 11, 31);
  
    return (
      firstDayOfYear.getDay() === 4 || // Starts on Thursday
      (lastDayOfYear.getDay() === 4 && (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) // Leap year and ends on Thursday
    );
  };