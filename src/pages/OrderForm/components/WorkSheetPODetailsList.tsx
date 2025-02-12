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
interface Column {
  id: keyof WorkSheetPODModel;
  label: string;
}

const columns: Column[] = [
  { id: "SKU_Number", label: "SKU Number" },
  { id: "Description", label: "Description" },
  { id: "BUY_UM", label: "Buy U/M" },
  { id: "SELL_UM", label: "Sell U/M" },
  { id: "Original_Order", label: "Original Order" },
  { id: "On_Order", label: "On Order" },
  { id: "Extended_Retail", label: "Extended Retail" },
  { id: "Extended_Cost", label: "Extended Cost" },
];
interface Props {
  id: string;
}
const WorkSheetPODetailsList: React.FC<Props> = ({ id }) => {
  const { getWorkSheetPODetails, zWSPODList, zWSPODetailsSearchText } =
    useWSPODetailsContext();

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

  let workSheetPODFormattedList: WorkSheetPODModel[] | null;

  workSheetPODFormattedList = zWSPODList;
  const filteredWSPODList = workSheetPODFormattedList?.filter((wsPOD) =>
    zWSPODetailsSearchText
      ? wsPOD.SKU_Number.toString()
          .toLowerCase()
          .includes(zWSPODetailsSearchText.toLowerCase())
      : true
  );

  useEffect(() => {
    getWorkSheetPODetails(id);
  }, []);

  //for FE search text only
  //   useEffect(() => {}, [zSkuSearchText, zSkuEnrollmentTab]);

  return (
    <TableData
      data={filteredWSPODList || []}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

interface TableDataProps {
  data: WorkSheetPODModel[];
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
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
              {data.length === 0 ? (
                <TableRow>
                  <StyledTableCellNoData
                    colSpan={columns.length}
                    align="center"
                  >
                    No data found
                  </StyledTableCellNoData>
                </TableRow>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => {
                        return (
                          <StyledTableCellBody key={column.id}>
                            {row[column.id]}
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
          count={data.length}
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
