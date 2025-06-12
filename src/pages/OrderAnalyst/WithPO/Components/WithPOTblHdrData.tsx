import React from "react";
import { IWithPOColumn } from "../Interface/IWithPOColumn";
import { IWithPORow } from "../Interface/IWithPORow";
import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import StyledTableCellHeader from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
interface Props {
  columns: IWithPOColumn[];
  visibleColumns: Partial<Record<keyof IWithPORow, boolean>>;
  onSort: (columnId: keyof IWithPORow) => void;
  orderBy: keyof IWithPORow | "";
  order: "asc" | "desc";
  isView?: boolean;
}
const WithPOTblHdrData: React.FC<Props> = ({
  columns,
  visibleColumns,
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

          const isVisible = visibleColumns[column.id as keyof IWithPORow];
          if (!isVisible) return null;
          return (
            <StyledTableCellHeader key={column.id}>
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={() => onSort(column.id as keyof IWithPORow)}
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

export default WithPOTblHdrData;
