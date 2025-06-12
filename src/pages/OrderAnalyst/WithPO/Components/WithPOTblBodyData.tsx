import React from "react";
import { IWithPOColumn } from "../Interface/IWithPOColumn";
import { IWithPORow } from "../Interface/IWithPORow";
import { WithPOModel } from "../../../../types/withpomodel";
import { Box, Button, TableBody, TableRow } from "@mui/material";
import StyledTableCellNoData from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import { formatDate } from "../../../../utils/formatDate";
import { formatDateToMMDDYYYY } from "../../../../utils/formatDateToMMDDYYYY";

interface Props {
  columns: IWithPOColumn[];
  visibleColumns: Partial<Record<keyof IWithPORow, boolean>>;
  isView?: boolean;
  sortedRows: WithPOModel[];
  data: WithPOModel[];
  onSkuRedirect: (skuNumber: string) => void;
}
const WithPOTblBodyData: React.FC<Props> = ({
  columns,
  visibleColumns,
  isView,
  sortedRows,
  data,
  onSkuRedirect,
}) => {
  return (
    <TableBody>
      {data.length === 0 ? (
        <TableRow>
          <StyledTableCellNoData colSpan={columns.length} align="center">
            No data found
          </StyledTableCellNoData>
        </TableRow>
      ) : (
        sortedRows
          // .slice(
          //   pageScroll * rowsPerPage,
          //   pageScroll * rowsPerPage + rowsPerPage
          // )
          .map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                if (column.id === "ActionTblCol" && isView) {
                  return <></>;
                } else if (
                  column.id !== "ActionTblCol" &&
                  visibleColumns[column.id as keyof IWithPORow] === true
                ) {
                  if (true) {
                    return (
                      <StyledTableCellBody
                        key={column.id}
                        onClick={
                          column.label === "SKU"
                            ? () => onSkuRedirect(row.SkuNumber)
                            : () => {}
                        }
                      >
                        {column.id === "DateTimeCreated"
                          ? formatDateToMMDDYYYY(row[column.id])
                          : row[column.id]}
                      </StyledTableCellBody>
                    );
                  } else {
                    return <></>;
                  }
                }
              })}
            </TableRow>
          ))
      )}
    </TableBody>
  );
};

export default WithPOTblBodyData;
