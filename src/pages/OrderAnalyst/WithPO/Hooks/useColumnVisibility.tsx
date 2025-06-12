import { useCallback, useState } from "react";
import { IWithPORow } from "../Interface/IWithPORow";

interface UseColumnVisibilityProps {
  initialColumns: Partial<IWithPORow>;
}

interface UseColumnVisibilityReturn {
  visibleColumns: Partial<IWithPORow>;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleColumnToggle: (column: keyof IWithPORow) => void;
}

const useColumnVisibility = ({
  initialColumns,
}: UseColumnVisibilityProps): UseColumnVisibilityReturn => {
  const [visibleColumns, setVisibleColumns] =
    useState<Partial<IWithPORow>>(initialColumns);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleColumnToggle = useCallback((column: keyof IWithPORow) => {
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
