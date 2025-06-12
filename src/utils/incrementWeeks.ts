export function incrementWeeks(currentValue: string, increment = 13) {
  let [year, week] = currentValue.split(".").map(Number); // Split and parse
  week += increment; // Increment the week

  // Handle year rollover
  if (week > 52) {
    year += Math.floor(week / 52); // Add rollover years
    week = week % 52 || 52; // Calculate the new week
  }

  return `${year}.${week.toString().padStart(2, "0")}`; // Return formatted string
  }

  