export const formatDateToMMDDYYYY = (dateString: string) => {
  const date = new Date(dateString);
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
  };
  