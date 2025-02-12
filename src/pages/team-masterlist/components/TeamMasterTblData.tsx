import React, { useEffect, useState } from "react";

import { TeamMasterlistModel } from "../../../types/teammasterlistmodel";
import useTeamMasterlistContext from "../../../store/team-masterlist/useTeamMasterlistContext";
import useColumnVisibility from "../hooks/useColumnVisibility";
import { Box, Button, Checkbox, Grid, Menu, MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import StyledTableCellHeader from "../../../components/table-components/StyledTableCellHeader";
import StyledTableCellNoData from "../../../components/table-components/StyledTableCellNoData";
import StyledTableCellBody from "../../../components/table-components/StyledTableCellBody";
import StyledButton from "../../../components/button-components/StyledButton";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface TableDataProps {
  data: TeamMasterlistModel[];
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isView?: boolean;
}

interface Column {
  id: keyof TeamMasterlistModel;
  label: string;
}

// Id: string;
// TeamName: string;
// ColorCode: string;
// Shift: string;
// Area: string;
// Plantilla: string;
// Vacancies: string;

const columns: Column[] = [
  { id: "TeamName", label: "Team Name" },
  { id: "ColorCode", label: "Color Code" },
  { id: "Shift", label: "Shift" },
  { id: "Area", label: "Area" },
  { id: "Plantilla", label: "Plantilla" },
  { id: "Vacancies", label: "Vacancies" },
  { id: "ActionTblCol", label: "Action" },
];

interface Row {
  TeamName: boolean;
  ColorCode: boolean;
  Shift: boolean;
  Area: boolean;
  Plantilla: boolean;
  Vacancies: boolean;
  ActionTblCol: boolean;
}

const TeamMasterTblData: React.FC<TableDataProps> = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isView,
}) => {
  console.log("data: ", data);
  const { zTeamSearchText } = useTeamMasterlistContext();

  const {
    visibleColumns,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleColumnToggle,
  } = useColumnVisibility({
    initialColumns: {
      TeamName: true,
      ColorCode: true,
      Shift: true,
      Area: true,
      Plantilla: true,
      Vacancies: true,
      ActionTblCol: true,
    },
  });

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Row | "">("");
  const [displayedRows, setDisplayedRows] = useState<TeamMasterlistModel[]>([]);
  const [pageScroll, setPageScroll] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleSort = (property: keyof Row) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy("");
  };

  const loadMoreRows = () => {
    const startIndex = pageScroll * rowsPerPage;
    const newRows = data.slice(startIndex, startIndex + rowsPerPage);
    console.log("newRows: ", newRows);
    setDisplayedRows((prev) => [...prev, ...newRows]);
    console.log("pageScroll: ", pageScroll);
    setPageScroll((prev) => prev + 1);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log("handleScroll");
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollPosition = scrollTop + clientHeight;
    if (scrollPosition >= scrollHeight * 0.9 && pageScroll < totalPages) {
      loadMoreRows();
    }
  };

  // to display the data in the table when zSkuMasterList is updated
  useEffect(() => {
    // setDisplayedRows(allRows.slice(0, rowsPerPage));
    setDisplayedRows(data.slice(0, rowsPerPage));
    setPageScroll(1);
  }, [zTeamSearchText]);

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
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={2}>
          <Button variant="outlined" onClick={handleResetSort} sx={{ mb: 2 }}>
            Reset Sort
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton> */}
          <Button variant="outlined" onClick={handleMenuOpen} sx={{ mb: 2 }}>
            Show / Hide Columns
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {Object.keys(visibleColumns).map((column) => (
              <MenuItem
                key={column}
                onClick={() => handleColumnToggle(column as keyof Row)}
              >
                <Checkbox checked={visibleColumns[column as keyof Row]} />
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
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
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.id === "ActionTblCol" && isView) {
                  return <></>;
                } else if (visibleColumns[column.id as keyof Row] === true) {
                  return (
                    <StyledTableCellHeader key={column.id}>
                      <TableSortLabel
                        key={column.id}
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id as keyof Row)}
                        sx={{
                          color: orderBy === column.id ? "red" : "inherit", // Set active column text color to red
                          "&.Mui-active": {
                            color: "red", // Ensure active color remains red
                          },
                          "&:hover": {
                            color: orderBy === column.id ? "red" : "inherit", // Prevent color change on hover
                          },
                          "&:focus": {
                            backgroundColor: "transparent", // Prevent focus background color change
                          },
                        }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </StyledTableCellHeader>
                  );
                }
              })}
            </TableRow>
          </TableHead>
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
                      if (
                        column.id !== "ActionTblCol" &&
                        visibleColumns[column.id as keyof Row] === true
                      ) {
                        return (
                          <StyledTableCellBody
                            key={column.id}
                            // onClick={
                            //   column.label === "SKU"
                            //     ? () => handleEdit(row)
                            //     : () => {}
                            // }
                          >
                            {row[column.id]}
                          </StyledTableCellBody>
                        );
                      } else {
                        return (
                          <>
                            {!isView && (
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} xl={6}>
                                  {" "}
                                  <StyledButton
                                    // onClick={() => handleEdit(row)}
                                    sx={{
                                      backgroundColor: "#47AD7D",
                                      height: "40px",
                                      width: "100%",
                                      borderRadius: "99px",
                                      color: "#FFFFFF",
                                      marginLeft: 0.5,
                                      "&:hover": {
                                        backgroundColor: "#206E47",
                                        color: "#FFFFFF",
                                      },
                                    }}
                                  >
                                    <EditNoteRoundedIcon /> Edit Sku
                                  </StyledButton>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} xl={6}>
                                  {" "}
                                  <StyledButton
                                    // onClick={() => handleShowDelete(row.Id)}
                                    sx={{
                                      backgroundColor: "#AD4747",
                                      height: "40px",
                                      width: "100%",
                                      borderRadius: "99px",
                                      color: "#FFFFFF",
                                      marginLeft: 0.5,
                                      "&:hover": {
                                        backgroundColor: "#6E2020",
                                        color: "#FFFFFF",
                                      },
                                    }}
                                  >
                                    <CloseRoundedIcon /> Delete Sku
                                  </StyledButton>
                                </Grid>
                              </Grid>
                            )}
                          </>
                        );
                      }
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Typography variant="body1">
          Page {pageScroll} of {totalPages}
        </Typography>
      </Box>
      {/* <StyledTablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={pageScroll}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      /> */}

      {/* <SkuEnrollmentModal /> */}
    </React.Fragment>
  );
};

export default TeamMasterTblData;
