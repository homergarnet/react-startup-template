export function incrementWeeks(currentValue: string, increment = 13) {
  let [year, week] = currentValue.split(".").map(Number); // Split and parse
  week += increment; // Increment the week

  // this will become 52 or 53 depending on the year if it has 52 or 53 weeks
  var weeksInYear = getWeeksInYear(year); // Get the number of weeks in the year
  // Handle year rollover
  if (week > weeksInYear) {
    year += Math.floor(week / weeksInYear); // Add rollover years
    week = week % weeksInYear || weeksInYear; // Calculate the new week
  }

  return `${year}.${week.toString().padStart(2, "0")}`; // Return formatted string
}

function getWeeksInYear(year: number): number {
  const d = new Date(year, 11, 31); // Dec 31
  const day = d.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  // ISO weeks: week starts on Monday, and week 1 is the first week with a Thursday
  return day === 4 || (day === 3 && isLeapYear(year)) ? 53 : 52;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// backup code if the code above is not working in week 53

// export function incrementWeeks(currentValue: string, increment = 13): string {
//   let [year, week] = currentValue.split(".").map(Number);
//   week += increment;

//   // Keep adjusting for year rollover while week exceeds the current year's weeks
//   while (true) {
//     const weeksInYear = getWeeksInYear(year);
//     if (week <= weeksInYear) break;
//     week -= weeksInYear;
//     year++;
//   }

//   return `${year}.${week.toString().padStart(2, "0")}`;
// }

// function getWeeksInYear(year: number): number {
//   const d = new Date(year, 11, 31); // Dec 31
//   const day = d.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
//   return day === 4 || (day === 3 && isLeapYear(year)) ? 53 : 52;
// }

// function isLeapYear(year: number): boolean {
//   return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// }
