import React, { useEffect, useState } from "react";
import {
  SkuMasterModel,
  UpdateWorksheetfileOrderingRequest,
} from "../../../../types/skumastermodel";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import useColumnVisibility from "../hooks/useColumnVisibility";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Icon for empty box
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  useTheme,
} from "@mui/material";
import StyledTableCellHeader from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
import StyledTableCellNoData from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import StyledButton from "../../../../Components/ReusableComponents/ButtonComponents/StyledButton";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StyledTablePagination from "../../../../Components/ReusableComponents/TableComponents/StyledTablePagination";
import SkuEnrollmentModal from "./SkuEnrollmentModal";
import { useSkuActions } from "../hooks/useSkuActions";
import * as XLSX from "xlsx";
import { getDateTimeNow } from "../../../../utils/getDateTimeNow";
import BulkInsert from "./BulkInsert";
import { addSpaceToPascalCase } from "../../../../utils/addSpacePascalCase";
import CheckIcon from "@mui/icons-material/Check";
import useSwal from "../../../../Hooks/useSwal";
import { UPDATED_FOR_ORDERING_STATUS_MESSAGE } from "../../../../constants/constants";
interface TableDataProps {
  data: SkuMasterModel[];
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isView?: boolean;
  isEnableCheckbox?: boolean;
  isForApprovalDisabled: boolean;
  isApprovedDisabledOrder: boolean;
}

interface Column {
  id: keyof SkuMasterModel;
  label: string;
}

const columns: Column[] = [
  { id: "Checkbox", label: "Checkbox" },
  { id: "SkuNumber", label: "SKU" },
  { id: "ShelfLifeWeeks", label: "Shelf Life" },
  { id: "Trigger", label: "Trigger" },
  { id: "BuildTo", label: "Build To" },
  { id: "TotalOrderLeadTime", label: "Order Lead Time" },
  { id: "PoDay", label: "PO Schedule" },
  { id: "Buyer", label: "Buyer" },
  { id: "UnitPerCase", label: "Unit per Case" },
  { id: "CasePerPallet", label: "Case per Pallet" },
  { id: "ActionTblCol", label: "Action" },
];

interface Row {
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

const SETableData: React.FC<TableDataProps> = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isView,
  isEnableCheckbox,
  isForApprovalDisabled,
  isApprovedDisabledOrder,
}) => {
  const {
    zSkuMasterList,
    zSkuSearchText,
    updateWorksheetfileOrdering,
    zCheckedItemsCache,
    zSetCheckedItemsCache,
    updateZCheckedItemsCache,
    toggleZCheckedItemsCache,
    resetZCheckedItemsCache,
  } = useSkuMasterListContext();

  const {
    visibleColumns,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleColumnToggle,
  } = useColumnVisibility({
    initialColumns: {
      Checkbox: true,
      SkuNumber: true,
      ShelfLifeWeeks: true,
      Trigger: true,
      BuildTo: true,
      TotalOrderLeadTime: true,
      PoDay: true,
      Buyer: true,
      UnitPerCase: true,
      CasePerPallet: true,
      ActionTblCol: true,
    },
  });

  const { handleEdit, handleShowDelete } = useSkuActions();

  const { showConfirm, showToast } = useSwal();
  const theme = useTheme();
  const getRoleId = Number(localStorage.getItem("roleId")) || 0;

  // const { sortedData, order, orderBy, handleSort, handleResetSort } =
  //   useSortedData({
  //     // data: displayedRows,
  //     data,
  //     defaultOrder: "asc",
  //     defaultOrderBy: "",
  //   });

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Row | "">("");
  const [displayedRows, setDisplayedRows] = useState<SkuMasterModel[]>([]);
  const [pageScroll, setPageScroll] = useState(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const allChecked =
    data.length > 0 &&
    data
      .slice(0, pageScroll * rowsPerPage)
      .every((row) => checkedItems[row.SkuNumber]);

  const handleSort = (property: keyof Row) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy("");
  };

  const handleHeaderCheckboxChange = () => {
    const newCheckedState = allChecked
      ? {} // Uncheck all
      : data
          .slice(0, pageScroll * rowsPerPage)
          .reduce((acc, row) => ({ ...acc, [row.SkuNumber]: true }), {}); // Check all

    setCheckedItems(newCheckedState);
    updateZCheckedItemsCache(newCheckedState);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    skuNumber: string
  ) => {
    const isChecked = event.target.checked;
    console.log("isChecked: ", isChecked);
    setCheckedItems((prev) => ({
      ...prev,
      [skuNumber]: isChecked,
    }));
    toggleZCheckedItemsCache(skuNumber, isChecked);
  };

  const handleApproveStatus = async (statusType: string) => {
    if (Object.keys(zCheckedItemsCache).length > 0) {
      const result = await showConfirm(
        `Are you sure you want to ${statusType}`,
        "You won't be able to revert this!"
      );
      if (result.isConfirmed) {
        //so the success toast or error toast display once
        let errorCounterObj = { error: "", counter: 0 } as {
          error: string;
          counter: number;
        };

        for (let i = 0; i < Object.keys(zCheckedItemsCache).length; i++) {
          let skuNumber = Object.keys(zCheckedItemsCache)[i];
          let ForOrderingStatus = Object.values(zCheckedItemsCache)[i];
          console.log(
            "Object.values(zCheckedItemsCache)[i]: ",
            Object.values(zCheckedItemsCache)[i]
          );
          console.log("skuNumber: ", skuNumber);
          console.log("ForOrderingStatus: ", ForOrderingStatus);
          let worksheetFileOrderingObj: UpdateWorksheetfileOrderingRequest = {
            SkuNumber: skuNumber,
            ForOrderingStatus:
              ForOrderingStatus && getRoleId === 1
                ? 3
                : ForOrderingStatus
                ? 2
                : 1,
          };
          let res = await updateWorksheetfileOrdering(worksheetFileOrderingObj);
          if (res === UPDATED_FOR_ORDERING_STATUS_MESSAGE) {
            // update state
            console.log("res: ", res);
            setDisplayedRows((prevRows) => {
              return prevRows.map((row, index) =>
                row.SkuNumber === skuNumber
                  ? {
                      ...row,
                      ForOrderingStatus: 2,
                    }
                  : row
              );
            });
          } else {
            errorCounterObj.error += res + " ";
          }
          errorCounterObj.counter++;
        }

        console.log("displayedRows: ", displayedRows);

        if (
          errorCounterObj.counter === Object.keys(zCheckedItemsCache).length
        ) {
          showToast(UPDATED_FOR_ORDERING_STATUS_MESSAGE, "success");
        } else {
          showToast(errorCounterObj.error, "error");
        }
      } else {
        showToast("Cancelled", "info");
      }
    } else {
      showToast("Check atleast one for ordering checkbox", "info");
    }
  };

  const exportToExcel = (data: any[], fileName: string) => {
    // Define custom column headers
    const headerMapping: { [key: string]: string } = {
      SkuNumber: "Sku Number",
      ShelfLifeWeeks: "Shelflife weeks",
      Trigger: "Trigger",
      BuildTo: "Build to",
      TotalOrderLeadTime: "Order lead time",
      PoDay: "PO Schedule",
      Buyer: "Order specialist",
      UnitPerCase: "Unit per case",
      CasePerPallet: "Case per pallet",
    };

    // Convert data keys to match custom headers
    const transformedData = data.map((item) =>
      Object.keys(item).reduce((acc, key) => {
        const newKey = headerMapping[key] || key; // Use custom header if available
        acc[newKey] = item[key]; // Assign the value to the new key
        return acc;
      }, {} as any)
    );
    // console.log("transformedData: ", transformedData);
    // Create worksheet and manually set headers
    const ws = XLSX.utils.json_to_sheet(transformedData, {
      header: Object.values(headerMapping), // Set custom headers
      skipHeader: false, // Prevent default headers
    });

    // Create workbook and append sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write to file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const loadMoreRows = () => {
    const startIndex = pageScroll * rowsPerPage;
    const newRows = data.slice(startIndex, startIndex + rowsPerPage);
    console.log("newRows: ", newRows);
    setDisplayedRows((prev) => [...prev, ...newRows]);
    console.log("pageScroll: ", pageScroll);
    setPageScroll((prev) => prev + 1);

    const newCheckedState = newRows.reduce((acc, row) => {
      if (row.ForOrderingStatus === 2 || row.ForOrderingStatus === 3) {
        return { ...acc, [row.SkuNumber]: row.ForOrderingStatus };
      }
      return acc;
    }, {});

    setCheckedItems((prev) => ({
      ...prev,
      ...newCheckedState,
      ...zCheckedItemsCache,
    }));
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
    const filteredData = data
      .filter((row) => {
        if (isForApprovalDisabled) {
          return row.ForOrderingStatus === 1 || row.ForOrderingStatus === 2;
        } else {
          return row.ForOrderingStatus === 3;
        }
      })
      .slice(0, rowsPerPage);

    console.log("filteredData.length: ", filteredData.length);
    console.log("rowsPerPage: ", rowsPerPage);
    setTotalPages(
      data.length / rowsPerPage === 0 ? 1 : Math.ceil(data.length / rowsPerPage)
    );

    setDisplayedRows(
      isForApprovalDisabled || isApprovedDisabledOrder
        ? filteredData
        : data.slice(0, rowsPerPage)
    );

    setPageScroll(1);
    //if cache exist
    if (Object.keys(zCheckedItemsCache).length > 0) {
      setCheckedItems((prev) => ({ ...prev, ...zCheckedItemsCache }));
    } else {
      //when user search
      const newCheckedState = data
        .slice(0, rowsPerPage)
        .reduce(
          (acc, row) => ({ ...acc, [row.SkuNumber]: row.ForOrderingStatus }),
          {}
        );
      setCheckedItems((prev) => ({
        ...prev,
        ...zCheckedItemsCache,
        ...newCheckedState,
      }));
    }
  }, [zSkuSearchText]);

  //for inialization setting up checkedItems
  useEffect(() => {
    const newCheckedState = data.slice(0, rowsPerPage).reduce((acc, row) => {
      if (row.ForOrderingStatus === 2 || row.ForOrderingStatus === 3) {
        return { ...acc, [row.SkuNumber]: row.ForOrderingStatus };
      }
      return acc;
    }, {});

    // console.log("newCheckedState: ", data.slice(0, rowsPerPage));

    //if cache exist
    if (Object.keys(zCheckedItemsCache).length > 0 && !isFirstRender) {
      setCheckedItems((prev) => ({
        ...prev,
        ...newCheckedState,
        ...zCheckedItemsCache,
      }));
    } else {
      setIsFirstRender(false);
      setCheckedItems(newCheckedState);
      console.log("newCheckedState: ", newCheckedState);
    }
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
    <React.Fragment>
      <Grid container spacing={1} sx={{ ml: 1 }}>
        <Grid item xs={12} sm={3}>
          <Button onClick={handleResetSort} sx={{ mb: 2, color: "#0462ac" }}>
            <RestoreIcon /> Reset Sort
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton> */}
          <Button onClick={handleMenuOpen} sx={{ mb: 2, color: "#0462ac" }}>
            <VisibilityIcon /> Show / Hide Columns
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {Object.keys(visibleColumns).map((column) =>
              column.charAt(0).toUpperCase() +
                addSpaceToPascalCase(column.slice(1)) !==
              "Action Tbl Col" ? (
                <MenuItem
                  key={column}
                  onClick={() => handleColumnToggle(column as keyof Row)}
                >
                  <Checkbox checked={visibleColumns[column as keyof Row]} />
                  {column.charAt(0).toUpperCase() +
                    addSpaceToPascalCase(column.slice(1))}
                </MenuItem>
              ) : null
            )}
          </Menu>
        </Grid>
        <Grid item xs={12} sm={3}>
          <BulkInsert />
        </Grid>{" "}
        <Grid item xs={12} sm={3}>
          <Button
            onClick={(e) =>
              exportToExcel(displayedRows, `Masterlist-${getDateTimeNow()}`)
            }
            sx={{ mb: 2, color: "#0462ac" }}
          >
            <SystemUpdateAltIcon /> Export EXCEL
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ ml: 1.5, mb: 2 }}>
        <Grid item xs={12} sm={3} md={3} xl={3}>
          {getRoleId !== 0 && getRoleId === 2 && isEnableCheckbox ? (
            <Button
              variant="outlined"
              onClick={() => handleApproveStatus("Disable")}
            >
              Disable SKU
            </Button>
          ) : isEnableCheckbox ? (
            <Button
              variant="outlined"
              onClick={() => handleApproveStatus("For Approval Disable")}
            >
              Disable For Ordering
            </Button>
          ) : null}
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
                  if (
                    column.id === "Checkbox" &&
                    isEnableCheckbox &&
                    !isApprovedDisabledOrder
                  ) {
                    return (
                      <>
                        <StyledTableCellHeader sx={{ textAlign: "left" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                id="Checkbox"
                                checked={allChecked}
                                onChange={handleHeaderCheckboxChange}
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={
                                  <CheckIcon
                                    sx={{
                                      backgroundColor: "white",
                                      color: "red",
                                    }}
                                  />
                                }
                                sx={{
                                  height: "5px",
                                  width: "20px",
                                  maxHeight: "20px",
                                  color: "white",
                                  ml: 0.8,
                                }}
                              />
                            }
                            // label="For ordering"
                            label=""
                            sx={{ gap: 1 }}
                          />
                        </StyledTableCellHeader>
                      </>
                    );
                  } else if (
                    column.id !== "Checkbox" ||
                    (isEnableCheckbox && !isApprovedDisabledOrder)
                  ) {
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
                        if (
                          column.id === "Checkbox" &&
                          isEnableCheckbox &&
                          !isApprovedDisabledOrder
                        ) {
                          return (
                            <>
                              <StyledTableCellBody>
                                <Checkbox
                                  sx={{
                                    height: "5px",
                                    width: "20px",
                                    maxHeight: "20px",
                                    display: "flex",
                                    cursor: "pointer",
                                    userSelect: "none",
                                  }}
                                  id={row.SkuNumber}
                                  checked={!!checkedItems[row.SkuNumber]}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, row.SkuNumber)
                                  }
                                  icon={<CheckBoxOutlineBlankIcon />} // Custom unchecked icon
                                  checkedIcon={
                                    <CheckIcon sx={{ color: "red" }} />
                                  } // Custom checked icon ("X")
                                />
                              </StyledTableCellBody>
                            </>
                          );
                        } else if (
                          column.id !== "Checkbox" ||
                          (isEnableCheckbox && !isApprovedDisabledOrder)
                        ) {
                          return (
                            <StyledTableCellBody
                              key={column.id}
                              onClick={
                                column.label === "SKU"
                                  ? () => handleEdit(row)
                                  : () => {}
                              }
                            >
                              <span
                                style={{
                                  color:
                                    row.ForOrderingStatus === 2
                                      ? theme.palette.text.secondary
                                      : "",
                                }}
                              >
                                {row[column.id]}
                              </span>
                            </StyledTableCellBody>
                          );
                        }
                      } else {
                        return (
                          <>
                            {!isView && (
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} xl={6}>
                                  {" "}
                                  <StyledButton
                                    onClick={() => handleEdit(row)}
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
                                    onClick={() =>
                                      handleShowDelete(row.Id, row.SkuNumber)
                                    }
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

      <SkuEnrollmentModal />
    </React.Fragment>
  );
};

export default SETableData;
