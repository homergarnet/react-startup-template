import { useState } from "react";
import { DashboardModel } from "../../../../types/dashboardmodel";

const useDisplayedRows = () => {
  const [displayedRows, setDisplayedRows] = useState<DashboardModel[]>([]);

  return {
    displayedRows,
    setDisplayedRows,
  };
};

export default useDisplayedRows;
