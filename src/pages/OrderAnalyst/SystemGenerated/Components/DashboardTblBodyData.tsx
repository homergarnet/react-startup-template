import React from "react";
import { IDashboardColumn } from "../../SkuMasterList/Interface/IDashboardColumn";
import { IDashboardRow } from "../../SkuMasterList/Interface/IDashboardRow";
import { DashboardModel } from "../../../../types/dashboardmodel";
import { Box, Button, Checkbox, TableBody, TableRow } from "@mui/material";
import StyledTableCellNoData from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Icon for empty box
import CheckIcon from "@mui/icons-material/Check";
import DTblDataTextField from "./DTblDataTextField";
import { formatNumber } from "../../../../utils/formatNumber";
import { useLocation } from "react-router-dom";
import { ROUTE_LOCATIONS } from "../../../../constants/constants";

interface Props {
  columns: IDashboardColumn[];
  visibleColumns: Partial<Record<keyof IDashboardRow, boolean>>;
  tableHeaderArr: string[];
  isView?: boolean;
  sortedRows: DashboardModel[];
  data: DashboardModel[];
  visibleWorksheetStatus: number;
  checkedItems: Record<string, boolean>;
  setCheckedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  onCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    skuNumber: string
  ) => void;
  onSkuRedirect: (skuNumber: string) => void;
  onAdjustedOrderChange: () => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdjustedOrderKeyDown: (
    skuNumber: string,
    moq: number
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onApproveReviewStatus: (
    statusType: string,
    skuNumber: string,
    worksheetStatus: number
  ) => Promise<void>;
}

const DashboardTblBodyData: React.FC<Props> = ({
  columns,
  visibleColumns,
  tableHeaderArr,
  isView = false,
  sortedRows,
  data,
  visibleWorksheetStatus,
  checkedItems,
  setCheckedItems,
  onCheckboxChange,
  onSkuRedirect,
  onAdjustedOrderChange,
  onAdjustedOrderKeyDown,
  onApproveReviewStatus,
}) => {
  const location = useLocation();

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
                  visibleColumns[column.id as keyof IDashboardRow] === true &&
                  tableHeaderArr.includes(column.id)
                ) {
                  if (
                    column.id === "Checkbox" &&
                    row.WorksheetStatus === visibleWorksheetStatus
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
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              userSelect: "none",
                              ml: "10px",
                            }}
                            id={row.SkuNumber}
                            checked={!!checkedItems[row.SkuNumber]}
                            onChange={(e) => onCheckboxChange(e, row.SkuNumber)}
                            icon={<CheckBoxOutlineBlankIcon />} // Custom unchecked icon
                            checkedIcon={<CheckIcon sx={{ color: "red" }} />} // Custom checked icon ("X")
                          />
                        </StyledTableCellBody>
                      </>
                    );
                  } else if (
                    column.id === "IsPOCheckbox" &&
                    row.WorksheetStatus === visibleWorksheetStatus
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
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              userSelect: "none",
                              ml: "10px",
                            }}
                            id={row.SkuNumber}
                            checked={!!checkedItems[row.SkuNumber]}
                            onChange={(e) => onCheckboxChange(e, row.SkuNumber)}
                            icon={<CheckBoxOutlineBlankIcon />} // Custom unchecked icon
                            checkedIcon={<CheckIcon sx={{ color: "red" }} />} // Custom checked icon ("X")
                          />
                        </StyledTableCellBody>
                      </>
                    );
                  } else if (row.WorksheetStatus === visibleWorksheetStatus) {
                    return (
                      <StyledTableCellBody
                        key={column.id}
                        onClick={
                          column.label === "SKU"
                            ? () => onSkuRedirect(row.SkuNumber)
                            : () => {}
                        }
                      >
                        {column.id === "AdjustedOrder" ? (
                          // <TextField
                          //   type="text"
                          //   key={index}
                          //   label=""
                          //   fullWidth
                          //   margin="normal"
                          //   InputLabelProps={{
                          //     shrink: true,
                          //   }}
                          //   onChange={handleAdjustedOrderChange()}
                          //   onKeyDown={handleAdjustedOrderKeyDown(
                          //     row.SkuNumber
                          //   )}
                          // />

                          location.pathname.includes(
                            `${ROUTE_LOCATIONS.MIX_CONTAINER_SUMMARY}`
                          ) ? (
                            formatNumber(row[column.id])
                          ) : (
                            <DTblDataTextField
                              key={index}
                              index={index}
                              value={row.AdjustedOrder || "0"}
                              moq={row.Moq}
                              onChange={onAdjustedOrderChange()}
                              onKeyDown={onAdjustedOrderKeyDown(
                                row.SkuNumber,
                                row.Moq
                              )}
                            />
                          )
                        ) : column.id === "Moq" ? (
                          formatNumber(row[column.id])
                        ) : column.id === "SuggestedOrder" ? (
                          row.AdjustedOrder &&
                          !isNaN(row.AdjustedOrder) &&
                          row.AdjustedOrder !== null ? (
                            formatNumber(row["AdjustedOrder"])
                          ) : (
                            formatNumber(row[column.id])
                          )
                        ) : column.id === "CurrentWeekSupply" ||
                          column.id === "ProjectedWeekSupply" ||
                          column.id === "AdjustedWeekSupply" ? (
                          <WeekSupplyColor
                            trigger={row.Trigger}
                            buildTo={row.BuildTo}
                            weekSupply={row[column.id]}
                          />
                        ) : (
                          row[column.id]
                        )}
                      </StyledTableCellBody>
                    );
                  } else {
                    return <></>;
                  }
                } else if (
                  visibleColumns[column.id as keyof IDashboardRow] === true &&
                  tableHeaderArr.includes(column.id) &&
                  row.WorksheetStatus === visibleWorksheetStatus
                ) {
                  return (
                    <>
                      <StyledTableCellBody
                        key={column.id}
                        onClick={column.label === "SKU" ? () => {} : () => {}}
                      >
                        {!isView && (
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <Button
                              variant="outlined"
                              onClick={
                                row.WorksheetStatus !== 4 &&
                                row.WorksheetStatus !== 3
                                  ? () =>
                                      onApproveReviewStatus(
                                        "approve",
                                        row.SkuNumber,
                                        4
                                      )
                                  : () => {}
                              }
                              sx={{
                                width: "100px",
                              }}
                            >
                              {row.WorksheetStatus === 4
                                ? "Approved"
                                : "Approve"}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={
                                row.WorksheetStatus !== 4 &&
                                row.WorksheetStatus !== 3
                                  ? () =>
                                      onApproveReviewStatus(
                                        "review",
                                        row.SkuNumber,
                                        3
                                      )
                                  : () => {}
                              }
                              sx={{
                                width: "100px",
                              }}
                            >
                              {row.WorksheetStatus === 3
                                ? "Reviewed"
                                : "Review"}
                            </Button>
                          </Box>
                        )}
                      </StyledTableCellBody>
                    </>
                  );
                }
              })}
            </TableRow>
          ))
      )}
    </TableBody>
  );
};

type WeekSupplyProps = {
  trigger: number;
  buildTo: number;
  weekSupply: number;
};

const WeekSupplyColor: React.FC<WeekSupplyProps> = ({
  trigger,
  buildTo,
  weekSupply,
}) => {
  return (
    <span
      style={{
        color:
          weekSupply < trigger + 1
            ? "red"
            : weekSupply > buildTo
            ? "orange"
            : "",
      }}
    >
      {weekSupply}
    </span>
  );
};

export default DashboardTblBodyData;
