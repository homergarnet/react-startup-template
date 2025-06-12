import {
  Box,
  Button,
  Checkbox,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import OrderFormTblHead from "./OrderFormTblHead";
import StyledTableCellNoData from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import { formatDate } from "../../../../utils/formatDate";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Icon for empty box
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SaveIcon from "@mui/icons-material/Save";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import CloseIcon from "@mui/icons-material/Close"; // Icon for "X"
import StyledTableCellTextField from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellTextField";
import { useNavigate } from "react-router-dom";
import IOrderFormList from "../Interface/IOrderFormList";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import { WorksheetDataModel } from "../../../../types/worksheetDataModel";
import { getDateTimeNow } from "../../../../utils/getDateTimeNow";
import * as XLSX from "xlsx";
import useSharedStore from "../../../../store/sharedStore";
import ManualAdjustmentField from "./ManualAdjustmentField";
import AccordionOrderForm from "./AccordionOrderForm";
import IOrderFormDetails from "../Interface/IOrderFormDetails";
import useConfirmNavigation from "../hooks/useConfirmNavigation";
import useConfirmBeforeExit from "../hooks/useConfirmBeforeExit";
import useSwal from "../../../../Hooks/useSwal";
import {
  baselineLYTYHighlight,
  UNSAVE_CHANGES_MESSAGE,
} from "../../../../constants/constants";
import { doesYearHave53Weeks } from "../../../../utils/doesCurrentYearHave53Weeks";
import CardTooltip from "./CardTooltip";
import { formatNumber } from "../../../../utils/formatNumber";
import IPOStatuses from "../Interface/IPOStatuses";

interface CheckedItems {
  [key: string]: boolean;
}

interface Props {
  orderFormsDetails: IOrderFormDetails | null;
  checkedItems: CheckedItems;
  currentYearAndWeeks: string[];
  previousYearAndWeeks: string[];
  orderFormList: IOrderFormList[] | null;
  trigger: number;
  totalPOCount: number;
  debouncedHAOnChange: (
    Week_No: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  debouncedHCCBOnChange: (Week_No: string, checked: boolean) => void;
  updateOrderForm: () => void;
}
const OrderFormTblList: React.FC<Props> = ({
  orderFormsDetails,
  checkedItems,
  currentYearAndWeeks,
  previousYearAndWeeks,
  orderFormList,
  trigger,
  totalPOCount,
  debouncedHAOnChange,
  debouncedHCCBOnChange,
  updateOrderForm,
}) => {
  const {
    createWorkSheetData,
    zOrderFormSearch,
    zBaseLineLastYear,
    zBaseLineThisYear,
    zSalesManualAdjustedWeeks,
    zSalesManualAdjustedValue,
    zCurrentWeekSupply,
    zProjectedWeekSupply,
    zSuggestedWeekNo,
    zSetSuggestedWeekNo,
    zFirstSuggestedOrder,
    zIsScroll,
    zSetIsScroll,
    zCurrentWeekHighlight,
    zZindex,
    zSetZindex,
    zFocusField,
    zSetFocusField,
    zIsSaveOrder,
    zSetIsSaveOrder,
    zSetIsOriginalClick,
    zPoWeekNumber,
    zSetPoWeekNumber,
    zPrevOrderFormSearch,
    zSetPrevOrderFormSearch,
    zIsTriggerCreateWsData,
    zSetIsTriggerCreateWsData,
    zIsTriggerWithWithoutSave,
    zSetIsTriggerWithWithoutSave,
    zSetOrderFormList,
    zSetOrderFormSearch,
    zGreenCurrentWeekNo,
    zGreenCurrentWeekSupply,
  } = useOrderFormContext();

  const { zSetLoading, zUserEmailAdd } = useSharedStore();
  const { showConfirm } = useSwal();
  const navigate = useNavigate();
  useConfirmNavigation({ checkedItems });
  useConfirmBeforeExit();

  const [open, setOpen] = useState<boolean[]>(Array(totalPOCount).fill(false));

  const openCounterRef = useRef(-1);

  const incrementByOne = () => {
    openCounterRef.current += 1;
    // console.log("Counter updated:", openCounterRef.current);
  };

  const handleOpen = (index: number) => {
    setOpen((prev) => prev.map((o, i) => (i === index ? true : o)));
  };

  const handleClose = (index: number) => {
    setOpen((prev) => prev.map((o, i) => (i === index ? false : o)));
  };

  const handleRedirect = (
    value: string,
    weekNo: string,
    poReceivedWeekNo: string
  ) => {
    // console.log("poReceivedWeekNo: ", poReceivedWeekNo);
    zSetPoWeekNumber(weekNo);
    navigate(
      `/order-analyst/order-form/worksheet-po-detail?id=${value}&po-received-week-no=${poReceivedWeekNo}`
    ); // Replace `row.id` with your value
  };

  // console.log("inside OrderFormTblList, checkedItems: ", checkedItems);
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateValue = (index: number, value: string) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]!.value = value;
    }
  };
  const scrollToRow = (id: string) => {
    const row = rowRefs.current[id];
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCreateWSData = (e: React.MouseEvent<HTMLButtonElement>) => {
    createWsData(false);
  };

  const createWsData = (isFromUseEffect = false) => {
    if (isFromUseEffect) {
      zSetIsSaveOrder(true);
    }
    let checkItemsStr = Object.entries(checkedItems)
      .filter(([key, value]) => value === true) // Filter items where value is true
      .map(([key]) => key) // Extract the keys
      .join(","); // Join them into a string
    Swal.fire({
      title: isFromUseEffect ? "Are you sure?" : "Saving worksheet.",
      text: isFromUseEffect
        ? UNSAVE_CHANGES_MESSAGE
        : "Are you sure you want to save this Worksheet?",
      icon: "info",
      showDenyButton: true, // Show a cancel button
      confirmButtonText: isFromUseEffect ? "Save and leave" : "Yes",
      denyButtonText: isFromUseEffect ? "Exit without saving" : "Cancel",
      reverseButtons: false, // To swap confirm and cancel buttons
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data: WorksheetDataModel = {
          SkuNumber: isFromUseEffect ? zPrevOrderFormSearch : zOrderFormSearch,
          ExTGAWeekNo: checkItemsStr,
          BaseLineTY: zBaseLineThisYear,
          BaseLineLY: zBaseLineLastYear,
          SalesManualAdjustedWeeks: zSalesManualAdjustedWeeks.slice(0, -1),
          SalesManualAdjustedValue: zSalesManualAdjustedValue.slice(0, -1),
          WorkSheetStatus: 2,
          WorkSheetUser: zUserEmailAdd,
          GreenCurrentWeekNo: zGreenCurrentWeekNo,
          GreenCurrentWeekSupply: zGreenCurrentWeekSupply,
          CurrentWeekSupply: zCurrentWeekSupply,
          ProjectedWeekSupply: zProjectedWeekSupply,
          SuggestedWeekNo: zSuggestedWeekNo,
          SuggestedOrder: zFirstSuggestedOrder,
          CreatedOn: getDateTimeNow(),
          ModifiedOn: getDateTimeNow(),
        };
        try {
          // Await the result of createSkuMasterList if it's a promise
          let res: any = await createWorkSheetData(data);
          console.log("res: ", res);
          zSetSuggestedWeekNo("");
          toast.success(res, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          zSetIsSaveOrder(true);
          if (isFromUseEffect) {
            zSetIsTriggerWithWithoutSave(true);
          }
        } catch (err: any) {
          // Handle any errors during the creation process
          toast.error("Failed to create/update Worksheet: " + err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
        // Swal.fire("Deleted!", "Your item has been deleted.", "success");
      } else if (result.isDenied) {
        // If the user clicks "Cancel"
        if (isFromUseEffect) {
          zSetIsTriggerWithWithoutSave(true);
        }
      }
    });
  };

  const exportToExcel = (data: any[], fileName: string) => {
    // Define custom column headers
    const headerMapping: { [key: string]: string } = {
      isDisabled: "isDisabled",
      isHighlight: "isHighlight",
      isHighlightLY: "isHighlightLY",
      isHighlightTY: "isHighlightTY",
      Week_No: "Week No",
      Week_From: "Week From",
      Week_To: "Week To",
      Original_PO_Eta: "Purchase Order Incoming POS",
      Latest_Expectation_Eta_PO: "Latest Expectation Eta PO",
      PO_Numbers: "PO Numbers",
      PO_Received_Week_No: "PO Received Week No",
      Latest_Expectation_Eta_Ordered: "Purchase Order Units ordered",
      Total_Quantity_Ordered: "Total Quantity Ordered",
      Original_PO_Eta_Ordered: "Original PO Eta Ordered",
      suggestedOrder: "Suggested Order",
      Sales_Forecast: "Forecast",
      Adjustment: "Sales Adjustment",
      SalesQuantitySold: "Sales Actual",
      endingInvEstimate: "Ending Inventory Estimate",
      Sales_On_Hand: "Ending Inventory Actual",
      endingInvWs: "Ending Inv Week Supply",
      POStatuses: "PO Statuses",
      Latest_Expectation_Lapse_Time: "Last Expectation Lapse Time",
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

  const exportToOriginal = async (fileName: string) => {
    zSetIsOriginalClick(true);
    const result = await showConfirm(
      "Are you sure you want to export without saved history?",
      ""
    );
    if (result.isConfirmed) {
      await downloadOriginalExcel(fileName);
      zSetIsOriginalClick(false);
      updateOrderForm();
    } else {
      zSetIsOriginalClick(false);
      updateOrderForm();
    }
  };

  const downloadOriginalExcel = async (fileName: string) => {
    const { zOrderFormList } = useOrderFormContext.getState();
    if (!zOrderFormList || zOrderFormList.length === 0) {
      console.warn("No data available for export.");
      return;
    }

    // Define custom column headers
    const headerMapping: Record<keyof IOrderFormList, string> = {
      isDisabled: "isDisabled",
      isHighlight: "isHighlight",
      isHighlightLY: "isHighlightLY",
      isHighlightTY: "isHighlightTY",
      Week_No: "Week No",
      Week_From: "Week From",
      Week_To: "Week To",
      Original_PO_Eta: "Purchase Order Incoming POS",
      Latest_Expectation_Eta_PO: "Latest Expectation Eta PO",
      PO_Numbers: "PO Numbers",
      PO_Received_Week_No: "PO Received Week No",
      Latest_Expectation_Eta_Ordered: "Purchase Order Units ordered",
      Total_Quantity_Ordered: "Total Quantity Ordered",
      Original_PO_Eta_Ordered: "Original PO Eta Ordered",
      suggestedOrder: "Suggested Order",
      Sales_Forecast: "Forecast",
      Adjustment: "Sales Adjustment",
      SalesQuantitySold: "Sales Actual",
      endingInvEstimate: "Ending Inventory Estimate",
      Sales_On_Hand: "Ending Inventory Actual",
      endingInvWs: "Ending Inv Week Supply",
      POStatuses: "PO Statuses",
      Latest_Expectation_Lapse_Time: "Last Expectation Lapse Time",
    };

    // Convert data keys to match custom headers
    const transformedData = zOrderFormList.map((item) =>
      Object.keys(item).reduce<Record<string, any>>((acc, key) => {
        const typedKey = key as keyof IOrderFormList;
        const newKey = headerMapping[typedKey] || key;
        acc[newKey] = item[typedKey];
        return acc;
      }, {})
    );

    // Create worksheet and manually set headers
    const ws = XLSX.utils.json_to_sheet(transformedData, {
      header: Object.values(headerMapping),
      skipHeader: false,
    });

    // Create workbook and append sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write to file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    Week_No: string,
    index: number
  ) => {
    zSetFocusField(Week_No); // Set loading to true while waiting for debounce
    debouncedHAOnChange(Week_No, e);
    updateValue(index, e.target.value);
  };

  useEffect(() => {
    if (zIsScroll) {
      scrollToRow(
        zPoWeekNumber !== "" ? zPoWeekNumber : currentYearAndWeeks[1]
      );
      zSetIsScroll(false);
    }
  }, [orderFormList]);

  // when user change sku prompt to save the changes of owf
  useEffect(() => {
    if (
      zPrevOrderFormSearch !== "" &&
      zPrevOrderFormSearch !== zOrderFormSearch &&
      !zIsSaveOrder
    ) {
      zSetOrderFormSearch(zPrevOrderFormSearch);
      createWsData(true);
      zSetIsTriggerCreateWsData(false);
    }
  }, [zIsTriggerCreateWsData]);

  return (
    <React.Fragment>
      <Box
        sx={
          {
            // flexGrow: 1,
            // // marginBottom: "100px",
            // position: "sticky",
            // top: 120, // Ensures it sticks to the top of the viewport
            // zIndex: 10, // Ensures it appears above other elements if necessary
            // backgroundColor: "#fff", // Prevents content behind from being visible
          }
        }
      >
        {orderFormList && orderFormList.length > 0 && (
          <Button
            onClick={() => scrollToRow(currentYearAndWeeks[1])}
            sx={{ color: "#0462ac" }}
          >
            <SwapVertIcon /> Scroll to Current
          </Button>
        )}
        {orderFormList && orderFormList.length > 0 && (
          <Button
            onClick={(e) => handleCreateWSData(e)}
            sx={{ color: "#0462ac" }}
          >
            {" "}
            <SaveIcon /> Save Worksheet
          </Button>
        )}
        {orderFormList && orderFormList.length > 0 && (
          <>
            <Button
              onClick={(e) =>
                exportToExcel(
                  orderFormList,
                  `${zOrderFormSearch}-${getDateTimeNow()}`
                )
              }
              sx={{ color: "#0462ac" }}
            >
              <SystemUpdateAltIcon />
              Export to EXCEL
            </Button>{" "}
            <Button
              onClick={(e) =>
                exportToOriginal(`${zOrderFormSearch}-${getDateTimeNow()}`)
              }
              sx={{ color: "#0462ac" }}
            >
              <BeenhereIcon />
              Export original
            </Button>
          </>
        )}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "10px",
            height: {
              xs: "350px", // Small screens
              sm: "450px", // Medium screens
              md: "550px", // Large screens
              lg: "600px", // Extra large screens
              xl: "700px", // Large desktops
            },
          }}
        >
          <Table
            sx={{ backgroundColor: "#ffffff", tableLayout: "fixed" }}
            stickyHeader
            aria-label="spanning table"
          >
            <OrderFormTblHead />
            <TableBody>
              {orderFormList && orderFormList.length === 0 ? (
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <StyledTableCellNoData colSpan={11} align="center">
                    No data found
                  </StyledTableCellNoData>
                </TableRow>
              ) : (
                //go to map
                orderFormList &&
                orderFormList.map((row, index) => {
                  let poReceivedWeekNo: string[] | null =
                    row.PO_Received_Week_No !== null &&
                    row.PO_Received_Week_No.includes(",")
                      ? row.PO_Received_Week_No.split(",")
                      : row.PO_Received_Week_No !== ""
                      ? [row.PO_Received_Week_No]
                      : null;

                  let poStatuses: IPOStatuses[] | null = row.POStatuses;

                  let latestExpectationLapseTime =
                    row.Latest_Expectation_Lapse_Time != null &&
                    row.Latest_Expectation_Lapse_Time.includes(",")
                      ? row.Latest_Expectation_Lapse_Time.split(",")
                      : row.Latest_Expectation_Lapse_Time !== ""
                      ? row.Latest_Expectation_Lapse_Time
                      : null;

                  // console.log("row.Week_No: ", row.Week_No);
                  // console.log(
                  //   "poReceivedWeekNo: ",
                  //   poReceivedWeekNo && poReceivedWeekNo[0]
                  // );
                  // if (poReceivedWeekNo && poReceivedWeekNo[0] !== null) {
                  //   console.log("nag if");
                  // } else {
                  //   console.log("nag else");
                  // }
                  // console.log("poStatuses: ", poStatuses);
                  // console.log(
                  //   "latestExpectationLapseTime: ",
                  //   latestExpectationLapseTime
                  // );
                  if (index === 0) {
                    openCounterRef.current = 0;
                  }
                  const originalPOEta =
                    row.PO_Numbers != null && row.PO_Numbers.includes(",") ? (
                      row.PO_Numbers.split(",").map((part, index2, array) => {
                        // console.log("part: ", part);
                        // console.log("index2: ", index2);
                        // console.log(
                        //   "poReceivedWeekNo[index2]: ",
                        //   poReceivedWeekNo && poReceivedWeekNo[index2]
                        // );
                        incrementByOne();
                        return (
                          <Tooltip
                            key={openCounterRef.current}
                            open={open[openCounterRef.current]}
                            onOpen={() => handleOpen(openCounterRef.current)}
                            onClose={() => handleClose(openCounterRef.current)}
                            title={
                              <CardTooltip
                                originalPOEta={part}
                                poReceivedWeekNo={
                                  poReceivedWeekNo &&
                                  poReceivedWeekNo[index2] !== null &&
                                  poReceivedWeekNo[index2] !== undefined
                                    ? poReceivedWeekNo[index2]
                                    : ""
                                }
                              />
                            }
                            arrow
                          >
                            <Typography
                              sx={{
                                fontSize: "12px",
                                cursor: "pointer",
                                // backgroundColor: "red",
                                color:
                                  poStatuses &&
                                  poStatuses[index2].PO_Number === part &&
                                  latestExpectationLapseTime &&
                                  parseInt(
                                    latestExpectationLapseTime[index2]
                                  ) >= 1
                                    ? "red"
                                    : latestExpectationLapseTime &&
                                      parseInt(
                                        latestExpectationLapseTime[index2]
                                      ) === 0
                                    ? ""
                                    : "green",
                                margin: "10px",
                                transition: "background-color 0.3s ease", // Smooth transition effect
                                "&:hover": {
                                  backgroundColor: (theme) =>
                                    theme.palette.text.secondary, // Change to a darker shade on hover
                                  color: "white", // Optional: Change text color on hover
                                },
                              }}
                              onClick={() =>
                                handleRedirect(
                                  part,
                                  row.Week_No,
                                  row.PO_Received_Week_No
                                )
                              }
                            >
                              {part}
                            </Typography>
                          </Tooltip>
                        );
                      })
                    ) : (
                      <Tooltip
                        key={openCounterRef.current}
                        open={open[openCounterRef.current]}
                        onOpen={() => handleOpen(openCounterRef.current)}
                        onClose={() => handleClose(openCounterRef.current)}
                        title={
                          <CardTooltip
                            originalPOEta={row.PO_Numbers}
                            poReceivedWeekNo={
                              row.PO_Received_Week_No != null
                                ? row.PO_Received_Week_No
                                : ""
                            }
                          />
                        }
                        arrow
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            cursor: "pointer",
                            // backgroundColor: "red",
                            margin: "10px",
                            transition: "background-color 0.3s ease", // Smooth transition effect
                            "&:hover": {
                              backgroundColor: (theme) =>
                                theme.palette.text.secondary, // Change to a darker shade on hover
                              color: "white", // Optional: Change text color on hover
                            },
                          }}
                          onClick={() =>
                            handleRedirect(
                              row.PO_Numbers,
                              row.Week_No,
                              row.PO_Received_Week_No
                            )
                          }
                        >
                          {row.PO_Numbers}
                        </Typography>
                      </Tooltip>
                    );
                  if (row.PO_Numbers != null && !row.PO_Numbers.includes(",")) {
                    incrementByOne();
                  }
                  const pointA =
                    currentYearAndWeeks[0]?.split(".").map(Number) || [];
                  const pointB =
                    currentYearAndWeeks[1]?.split(".").map(Number) || [];
                  const pointC =
                    previousYearAndWeeks[1]?.split(".").map(Number) || [];
                  const [yearA, weekA] = pointA;
                  const [yearB, weekB] = pointB;
                  const [yearC, weekC] = pointC;
                  const [rowYear, rowWeek] =
                    row.Week_No?.split(".").map(Number) || [];

                  const currentYearWeek = zCurrentWeekHighlight; // String input

                  // Split into year and week
                  const [year, week] = currentYearWeek.split(".").map(Number);

                  // Increment the year
                  const nextYearWeek = `${year + 1}.${week
                    .toString()
                    .padStart(2, "0")}`;
                  // console.log("nextYearWeek: ", nextYearWeek);
                  // Range checker
                  // const ThisYearWithinRange =
                  //   (rowYear > yearA ||
                  //     (rowYear === yearA && rowWeek >= weekA)) &&
                  //   (rowYear < yearB ||
                  //     (rowYear === yearB && rowWeek <= weekB));
                  // const isDisabledCb = !ThisYearWithinRange;

                  const isDisabledCb =
                    weekA <= 9
                      ? row.Week_No < `${yearA}.0${weekA}`
                      : row.Week_No < `${yearA}.${weekA}`;

                  // make it < sign when using it in production
                  const isDisabled =
                    weekA <= 9
                      ? row.Week_No < `${yearA}.0${weekA}`
                      : row.Week_No < `${yearA}.${weekA}`;

                  return (
                    <>
                      {" "}
                      <TableRow
                        key={row.Week_No}
                        ref={(el) => (rowRefs.current[row.Week_No] = el)}
                        sx={{
                          "& td": { border: 0 },
                          ...(isDisabled && {
                            opacity: 0.5,
                            pointerEvents: "none",
                          }),
                        }}
                        style={{
                          backgroundColor: row.isHighlight
                            ? "yellow"
                            : row.Week_No === zCurrentWeekHighlight
                            ? "lightgreen"
                            : "",
                        }}
                      >
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
                            }}
                            id={row.Week_No}
                            checked={!!checkedItems[row.Week_No]} // Use your state here
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              debouncedHCCBOnChange(
                                row.Week_No,
                                e.target.checked
                              )
                            }
                            disabled={isDisabledCb} // Optionally disable checkbox if row is disabled
                            icon={<CheckBoxOutlineBlankIcon />} // Custom unchecked icon
                            checkedIcon={<CloseIcon sx={{ color: "red" }} />} // Custom checked icon ("X")
                          />
                        </StyledTableCellBody>
                        <StyledTableCellBody className="Week_No">
                          {row.Week_No}
                        </StyledTableCellBody>
                        <StyledTableCellBody>
                          {/* {areDatesInSameMonth(row.Week_From, row.Week_To) ? } */}
                          {formatDate(row.Week_From)} to{" "}
                          {formatDate(row.Week_To)}
                        </StyledTableCellBody>
                        <StyledTableCellBody
                        // sx={{
                        //   whiteSpace: "normal",
                        //   wordWrap: "break-word",
                        //   cursor: "pointer",
                        // }}
                        >
                          {originalPOEta}
                        </StyledTableCellBody>

                        <StyledTableCellBody>
                          {row.Total_Quantity_Ordered !== 0 &&
                            formatNumber(row.Total_Quantity_Ordered)}
                        </StyledTableCellBody>
                        <StyledTableCellBody>
                          {row.suggestedOrder !== "0" && row.suggestedOrder}
                        </StyledTableCellBody>
                        <StyledTableCellBody>
                          {formatNumber(
                            Math.round(parseFloat(row.Sales_Forecast))
                          )}
                        </StyledTableCellBody>
                        <StyledTableCellBody>
                          {row.Adjustment ? (
                            <div key={index} style={{ marginBottom: "10px" }}>
                              <ManualAdjustmentField
                                value={formatNumber(row.Adjustment)}
                                index={index}
                                weekNo={row.Week_No}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={handleInputChange}
                                disabled={
                                  zFocusField !== null &&
                                  zFocusField !== row.Week_No
                                } // Disable other fields when one is focused
                              />
                            </div>
                          ) : (
                            <div key={index} style={{ marginBottom: "10px" }}>
                              <StyledTableCellTextField
                                type="text"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleInputChange(e, row.Week_No, index)}
                                disabled={
                                  zFocusField !== null &&
                                  zFocusField !== row.Week_No
                                } // Disable other fields when one is focused
                              />
                            </div>
                          )}
                        </StyledTableCellBody>
                        <StyledTableCellBody>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              cursor: "pointer",
                              backgroundColor: `${
                                yearB - rowYear === 1 && row.isHighlightLY
                                  ? baselineLYTYHighlight[0].color
                                  : yearB - rowYear === 0 && row.isHighlightTY
                                  ? baselineLYTYHighlight[1].color
                                  : ""
                              }`,
                              color: `${
                                yearB - rowYear === 1 && row.isHighlightLY
                                  ? "white"
                                  : yearB - rowYear === 0 && row.isHighlightTY
                                  ? "white"
                                  : ""
                              }`,
                              margin: "10px",
                              transition: "background-color 0.3s ease", // Smooth transition effect
                              // "&:hover": {
                              //   backgroundColor: "darkred", // Change to a darker shade on hover
                              //   color: "white", // Optional: Change text color on hover
                              // },
                            }}
                          >
                            {!isNaN(row.SalesQuantitySold) &&
                              formatNumber(row.SalesQuantitySold)}
                          </Typography>
                        </StyledTableCellBody>
                        <StyledTableCellBody>
                          {!isNaN(parseFloat(row.endingInvEstimate)) &&
                            formatNumber(
                              Math.round(parseFloat(row.endingInvEstimate))
                            )}
                        </StyledTableCellBody>
                        <StyledTableCellBody
                          className={
                            row.Sales_On_Hand
                              ? "Sales_On_Hand"
                              : "Sales_On_Hand_Null"
                          }
                        >
                          {/*  correct */}
                          {!isNaN(row.Sales_On_Hand) &&
                            formatNumber(Math.round(row.Sales_On_Hand))}
                        </StyledTableCellBody>

                        <StyledTableCellBody
                          style={{
                            color:
                              row.endingInvWs !== "X" &&
                              parseFloat(row.endingInvWs) < trigger + 1
                                ? "red"
                                : "",
                          }}
                        >
                          {/* for non X */}
                          {/* 
                      {row.endingInvWs !== "X" &&
                        !isNaN(parseFloat(row.endingInvWs)) &&
                        row.endingInvWs} */}
                          {row.endingInvWs !== "X" &&
                          (isNaN(parseFloat(row.endingInvWs)) ||
                            parseFloat(row.endingInvWs) === -1)
                            ? "X"
                            : isNaN(parseFloat(row.endingInvWs)) ||
                              (parseFloat(row.endingInvWs) <= 0 &&
                                row.Week_No <= nextYearWeek)
                            ? "-"
                            : row.Week_No >= nextYearWeek
                            ? "X"
                            : row.endingInvWs}
                        </StyledTableCellBody>
                      </TableRow>{" "}
                      {doesYearHave53Weeks(rowYear)
                        ? row.Week_No.includes(".53")
                        : row.Week_No.includes(".52") && (
                            <TableRow>
                              <TableCell colSpan={12} style={{ padding: 0 }}>
                                <Divider sx={{ bgcolor: "#f6842a" }}></Divider>
                              </TableCell>
                            </TableRow>
                          )}
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default OrderFormTblList;
