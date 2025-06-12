import { useState, useMemo } from "react";

type Order = "asc" | "desc";

interface UseSortedDataProps<T> {
  data: T[];
  defaultOrder?: Order;
  defaultOrderBy?: keyof T | "";
}

const useSortedData = <T extends object>({
  data,
  defaultOrder = "asc",
  defaultOrderBy = "",
}: UseSortedDataProps<T>) => {
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = useState<keyof T | "">(defaultOrderBy);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!orderBy) return 0; // No sorting if no column is selected
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, order, orderBy]);

  const handleSort = (column: keyof T) => {
    const isAscending = orderBy === column && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleResetSort = () => {
    setOrder(defaultOrder);
    setOrderBy(defaultOrderBy);
  };

  return {
    sortedData,
    order,
    orderBy,
    handleSort,
    handleResetSort, // Expose the reset function
  };
};

export default useSortedData;