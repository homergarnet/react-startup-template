export function getDateTimeNow() {
    
  const currentDateTime = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
    timeZone: "Asia/Manila",
    hour12: false,
  };

  // Format the date in the Philippines' time zone
  const formatter = new Intl.DateTimeFormat("en-PH", options);
  const formattedParts = formatter.formatToParts(currentDateTime);

  // Construct the formatted string manually
  const dateParts = {
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    second: "",
    fractionalSecond: "",
  };

  for (const part of formattedParts) {
    if (dateParts.hasOwnProperty(part.type)) {
      dateParts[part.type] = part.value;
    }
  }

  // Combine the parts into the desired format
  return `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}.0000000`;

}
