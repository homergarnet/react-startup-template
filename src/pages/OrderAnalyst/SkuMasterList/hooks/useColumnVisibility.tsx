import { useState, useCallback } from "react";

interface Row {
  Checkbox: boolean;
  SkuNumber: boolean;
  ShelfLifeWeeks: boolean;
  Trigger: boolean;
  BuildTo: boolean;
  TotalOrderLeadTime: boolean;
  PoDay: boolean;
  Buyer: boolean;
  UnitPerCase: boolean;
  CasePerPallet: boolean;
  ActionTblCol: boolean;
}

interface UseColumnVisibilityProps {
  initialColumns: Partial<Row>;
}

interface UseColumnVisibilityReturn {
  visibleColumns: Partial<Row>;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleColumnToggle: (column: keyof Row) => void;
}

const useColumnVisibility = ({
  initialColumns,
}: UseColumnVisibilityProps): UseColumnVisibilityReturn => {

  const [visibleColumns, setVisibleColumns] =
    useState<Partial<Row>>(initialColumns);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleColumnToggle = useCallback((column: keyof Row) => {
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
