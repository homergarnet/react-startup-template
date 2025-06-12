import { useState, useCallback } from "react";
import { IDashboardRow } from "../../SkuMasterList/Interface/IDashboardRow";

interface UseColumnVisibilityProps {
  initialColumns: Partial<IDashboardRow>;
}

interface UseColumnVisibilityReturn {
  visibleColumns: Partial<IDashboardRow>;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleColumnToggle: (column: keyof IDashboardRow) => void;
}

const useColumnVisibility = ({
  initialColumns,
}: UseColumnVisibilityProps): UseColumnVisibilityReturn => {
  const [visibleColumns, setVisibleColumns] =
    useState<Partial<IDashboardRow>>(initialColumns);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleColumnToggle = useCallback((column: keyof IDashboardRow) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  }, []);

  return {
    visibleColumns,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleColumnToggle,
  };
};

export default useColumnVisibility;
