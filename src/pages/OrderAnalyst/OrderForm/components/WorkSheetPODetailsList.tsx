import React, { useEffect, useState } from "react";
import { WorkSheetPODModel } from "../../../../types/workSheetPODetails";
import useWSPODetailsContext from "../../../../store/OrderAnalyst/OrderForm/useWSPODetailsContext";
import StyledScrollBox from "../../../../Components/ReusableComponents/ScrollBarComponents/StyledScrollBar";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StyledTableCellHeader from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
import StyledTableCellNoData from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import StyledTablePagination from "../../../../Components/ReusableComponents/TableComponents/StyledTablePagination";
import { useSearchParams } from "react-router-dom";
import { formatNADate } from "../../../../utils/formatNADate";
interface Column {
  id: keyof WorkSheetPODModel;
  label: string;
}

const columns: Column[] = [
  { id: "PO_Number", label: "PO Number" },
  { id: "SKU_Number", label: "SKU Number" },
  { id: "BUY_UM", label: "Buy U/M" },
  // { id: "SELL_UM", label: "Sell U/M" },
  { id: "Original_Order", label: "Original Order" },
  { id: "On_Order", label: "On Order" },
  { id: "GSheet_Revised_ETA", label: "Revised Eta" },
  { id: "MMS_Expected_Receipt_Date", label: "Original ETA" },
  { id: "Lapse_Time", label: "Lapse Weeks" },
  { id: "GSheet_Status", label: "PO Status" },
];

interface Props {
  poReceivedWeekNo: string;
}

const WorkSheetPODetailsList: React.FC<Props> = ({ poReceivedWeekNo }) => {
  const { getWorkSheetPODetails, zWSPODList, zWSPODetailsSearchText } =
    useWSPODetailsContext();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getWorkSheetPODetails(id);
  }, []);

  useEffect(() => {}, [zWSPODetailsSearchText]);

  return (
    <TableData
      poId={id}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      poReceivedWeekNo={poReceivedWeekNo}
    />
  );
};

interface TableDataProps {
  poId: string;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  poReceivedWeekNo: string;
}

const TableData: React.FC<TableDataProps> = ({
  poId,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  poReceivedWeekNo,
}) => {
  const { zWSPODList } = useWSPODetailsContext();

  return (
    <React.Fragment>
      <StyledScrollBox
        component={Paper}
        sx={{
          height: "600px",
          position: "relative",
          paddingTop: "10px",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
          boxShadow: "none",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <StyledTableCellHeader key={column.id}>
                      {column.label}
                    </StyledTableCellHeader>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {zWSPODList && zWSPODList.length === 0 ? (
                <TableRow>
                  <StyledTableCellNoData
                    colSpan={columns.length}
                    align="center"
                  >
                    No data found
                  </StyledTableCellNoData>
                </TableRow>
              ) : (
                zWSPODList &&
                zWSPODList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => {
                        return (
                          <StyledTableCellBody key={column.id}>
                            {column.id === "MMS_Expected_Receipt_Date" &&
                            row[column.id] !== "N/A"
                              ? formatNADate(row[column.id])
                              : column.id === "GSheet_Status" &&
                                poReceivedWeekNo !== "null"
                              ? "Received"
                              : row[column.id] === null ||
                                row[column.id] === "N/A"
                              ? "-"
                              : row[column.id]}
                          </StyledTableCellBody>
                        );
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledTablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={zWSPODList != null ? zWSPODList.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </StyledScrollBox>
    </React.Fragment>
  );
};

export default WorkSheetPODetailsList;
