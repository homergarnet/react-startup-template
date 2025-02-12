export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en-GB", { month: "short" }).format(
    date
  );
  return `${day}-${month}`;
};
