import React from "react";
import { DashboardModel } from "../../../../types/dashboardmodel";
import { IDashboardRow } from "../../SkuMasterList/Interface/IDashboardRow";
import { Checkbox, TableHead, TableRow, TableSortLabel } from "@mui/material";
import StyledTableCellHeader from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Icon for empty box
import CheckIcon from "@mui/icons-material/Check";
import { IDashboardColumn } from "../../SkuMasterList/Interface/IDashboardColumn";

interface Props {
  columns: IDashboardColumn[];
  visibleColumns: Partial<Record<keyof IDashboardRow, boolean>>;
  tableHeaderArr: string[];
  allChecked: boolean;
  onHeaderCheckboxChange: () => void;
  onSort: (columnId: keyof IDashboardRow) => void;
  orderBy: keyof IDashboardRow | "";
  order: "asc" | "desc";
  isView?: boolean;
}

const DashboardTblHdrData: React.FC<Props> = ({
  columns,
  visibleColumns,
  tableHeaderArr,
  allChecked,
  onHeaderCheckboxChange,
  onSort,
  orderBy,
  order,
  isView = false,
}) => {

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => {
          if (column.id === "ActionTblCol" && isView) {
            return null;
          }

          const isVisible = visibleColumns[column.id as keyof IDashboardRow];
          const isIncluded = tableHeaderArr.includes(column.id);

          if (!isVisible || !isIncluded) return null;

          if (column.id === "Checkbox" || column.id === "IsPOCheckbox") {
            return (
              <StyledTableCellHeader key={column.id}>
                <Checkbox
                  sx={{
                    height: "5px",
                    width: "20px",
                    maxHeight: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    userSelect: "none",
                    color: "white",
                  }}
                  id={column.id}
                  checked={allChecked}
                  onChange={onHeaderCheckboxChange}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={
                    <CheckIcon
                      sx={{ backgroundColor: "white", color: "red" }}
                    />
                  }
                />
              </StyledTableCellHeader>
            );
          }

          return (
            <StyledTableCellHeader key={column.id}>
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={() => onSort(column.id as keyof IDashboardRow)}
                sx={{
                  color: orderBy === column.id ? "red" : "inherit",
                  "&.Mui-active": {
                    color: "red",
                  },
                  "&:hover": {
                    color: orderBy === column.id ? "red" : "inherit",
                  },
                  "&:focus": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {column.label}
              </TableSortLabel>
            </StyledTableCellHeader>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default DashboardTblHdrData;
