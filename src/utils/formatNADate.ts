export const formatNADate = (dateStr: string): string => {
  console.log("dateStr: ", dateStr);

  if (!dateStr || dateStr.trim() === "") {
    return "-";
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return "-";
  }

  const year = date.getFullYear();
  return year <= 1970 ? "-" : date.toISOString().split("T")[0]; // Formats as YYYY-MM-DD
};
