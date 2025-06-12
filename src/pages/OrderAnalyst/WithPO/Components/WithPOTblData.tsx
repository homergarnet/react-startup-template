import React, { useCallback, useEffect, useState } from "react";
import { WithPOModel } from "../../../../types/withpomodel";
import { IWithPOColumn } from "../Interface/IWithPOColumn";
import { useNavigate } from "react-router-dom";
import useColumnVisibility from "../Hooks/useColumnVisibility";
import { IWithPORow } from "../Interface/IWithPORow";
import useHomeContext from "../../../../store/Home/useHomeContext";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import { Box, Paper, Table, TableContainer, Typography } from "@mui/material";
import WithPOTblHdrData from "./WithPOTblHdrData";
import WithPOTblBodyData from "./WithPOTblBodyData";

interface Props {
  data: WithPOModel[];
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isView?: boolean;
}

const columns: IWithPOColumn[] = [
  { id: "Id", label: "Id" },
  { id: "SkuNumber", label: "SKU" },
  { id: "DateTimeCreated", label: "Date Time Created" },
  { id: "DateTimeUpdated", label: "Date Time Updated" },
  { id: "CreatedBy", label: "Created by" },
  { id: "IsWithPO", label: "Is With PO" },
  { id: "IsEnabled", label: "Is Enabled" },
];

const WithPOTblData: React.FC<Props> = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isView,
}) => {
  const { getWithPOList } = useHomeContext();

  const { zSetOrderFormSearch } = useOrderFormContext();

  const navigate = useNavigate();

  const {
    visibleColumns,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleColumnToggle,
  } = useColumnVisibility({
    initialColumns: {
      Id: false,
      SkuNumber: true,
      DateTimeCreated: true,
      DateTimeUpdated: false,
      CreatedBy: true,
      IsWithPO: false,
      IsEnabled: false,
    },
  });

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IWithPORow | "">("");
  const [displayedRows, setDisplayedRows] = useState<WithPOModel[]>([]);

  const [pageScroll, setPageScroll] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleSort = (property: keyof IWithPORow) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy("");
  };

  const loadMoreRows = async () => {
    //if you get all the data without pagination in be, used this code
    // const startIndex = pageScroll * rowsPerPage;
    // const newRows = data.slice(startIndex, startIndex + rowsPerPage);
    // console.log("newRows: ", newRows);
    let homeTblList = await getWithPOList("", pageScroll + 1, rowsPerPage);

    console.log("pageScroll: ", pageScroll);
    console.log("homeTblList2: ", homeTblList);
    setDisplayedRows((prev) => [...prev, ...homeTblList]);
    console.log("pageScroll: ", pageScroll);
    setPageScroll((prev) => prev + 1);
    setIsLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollPosition = scrollTop + clientHeight;
    if (
      scrollPosition >= scrollHeight * 0.9 &&
      pageScroll < totalPages &&
      !isLoading
    ) {
      setIsLoading(true);
      loadMoreRows();
    }
  };

  const handleSkuRedirect = useCallback((skuNumber: string) => {
    zSetOrderFormSearch(skuNumber);
    navigate("/order-analyst/order-form");
  }, []);

  useEffect(() => {
    // setDisplayedRows(allRows.slice(0, rowsPerPage));
    console.log("data: ", data);
    setDisplayedRows(data.slice(0, rowsPerPage));
    setPageScroll(1);
  }, []);

  const sortedRows = [...displayedRows].sort((a, b) => {
    if (!orderBy) return 0;
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <TableContainer
        component={Paper}
        onScroll={handleScroll}
        sx={{
          width: "98%",
          height: "370px",
          overflowY: "scroll",
          padding: "10px 20px",
          borderRadius: "20px",
          boxShadow: "none",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2b4b81",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Table>
          <WithPOTblHdrData
            columns={columns}
            visibleColumns={visibleColumns}
            onSort={handleSort}
            orderBy={orderBy}
            order={order}
            isView={isView}
          />
          <WithPOTblBodyData
            columns={columns}
            visibleColumns={visibleColumns}
            isView={isView}
            sortedRows={sortedRows}
            data={data}
            onSkuRedirect={handleSkuRedirect}
          />
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Typography variant="body1">
          Page {pageScroll} of {totalPages}
        </Typography>
      </Box>
    </>
  );
};

export default WithPOTblData;
