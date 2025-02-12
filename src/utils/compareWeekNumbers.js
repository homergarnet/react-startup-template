export function compareWeekNumbers(rowWeek, currentWeek) {
  // Split both values into year and week components
  const [rowYear, rowWeekNo] = rowWeek.split(".").map(Number);
  const [currentYear, currentWeekNo] = currentWeek.split(".").map(Number);

  // Compare year first, then week number
  if (rowYear > currentYear) {
    return true; // rowWeek is later in a future year
  } else if (rowYear === currentYear) {
    return rowWeekNo > currentWeekNo; // Compare week numbers in the same year
  }
  return false; // rowWeek is earlier
}
