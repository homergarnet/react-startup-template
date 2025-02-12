export interface MonthInfo {
  currentMonthName: string; // Short name, e.g., "Jan"
  currentMonthNameFull: string; // Full name, e.g., "January"
  daysInCurrentMonth: number; // Number of days in the current month
  currentYear: number; // Current year, e.g., 2024
  monthNamesShort: string[]; // Array of short month names
  currentMonthNum: string; // Current month with leading zero, e.g., "04"
  currentMonthNumNoZero: number; // Current month as a number without leading zero, e.g., 4
}

export const getCurrentMonthInfo = (): MonthInfo => {
  const monthNamesShort: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthNamesFull: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  // Get the current month index (0-11)
  const currentMonthIndex: number = currentDate.getMonth();

  // Get the current month name from the arrays
  const currentMonthName: string = monthNamesShort[currentMonthIndex];
  const currentMonthNameFull: string = monthNamesFull[currentMonthIndex];

  // Get the current month (1-12)
  const currentMonth: number = currentMonthIndex + 1;

  // Get the current year
  const currentYear: number = currentDate.getFullYear();

  // Determine the number of days in the current month
  const nextMonth = new Date(currentYear, currentMonth, 0);
  const daysInCurrentMonth: number = nextMonth.getDate();

  // Month number with leading zero (e.g., "04" for April)
  const currentMonthNum: string =
    currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

  // Month number without leading zero (e.g., 4 for April)
  const currentMonthNumNoZero: number = currentMonth;

  return {
    currentMonthName,
    currentMonthNameFull,
    daysInCurrentMonth,
    currentYear,
    monthNamesShort,
    currentMonthNum,
    currentMonthNumNoZero,
  };
};