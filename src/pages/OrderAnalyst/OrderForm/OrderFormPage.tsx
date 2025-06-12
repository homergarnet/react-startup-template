import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Container,
  useTheme,
  Button,
} from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import React from "react";
import { AxiosRequestConfig } from "axios";
import api from "../../../Config/AxiosConfig";
import StyledSnackBar from "../../../Components/ReusableComponents/NotificationComponents/StyledAlert";
import StyledTableSearchBar from "../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";
import useOrderFormContext from "../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import debounce from "lodash.debounce";
import useSharedStore from "../../../store/sharedStore";
import BLLYField from "./components/BLLYField";
import BLTYField from "./components/BLTYField";
import AccordionOrderForm from "./components/AccordionOrderForm";
import OrderFormTblList from "./components/OrderFormTblList";
import useUpdateOrderForm from "./hooks/useUpdateOrderForm";
import { formatNumber } from "../../../utils/formatNumber";
import useLoginContext from "../../../store/Login/useLoginContext";
import { useNavigate } from "react-router-dom";

const OrderFormPage = () => {
  const { zDateModified } = useLoginContext();

  const {
    zBaseLineLastYear,
    zSetBaseLineLastYear,
    zBaseLineThisYear,
    zSetBaseLineThisYear,
    zSetIsClearLYTYBaseLine,
    zOrderFormList,
    zSetWorksheetHistory,
    zSetIsScroll,
    zSetCurrentWeekHighlight,
    zSetFocusField,
    zSetIsFirstLoad,
    zNextLeadTime,
    zSetNextLeadTime,
    zOrderFormSearch,
    zSetOrderFormSearch,
    zSetIsSaveOrder,
    zIsOriginalClick,
    zSetIsOriginalClick,
    zSetCurrentWeek,
    zCurrentWeekSupply,
    zProjectedWeekSupply,
    zAdjustedOrder,
    zSetAdjustedOrder,
    getAllMixedSkusBySku,
    zMixedSkuNumbers,
    zPalletTotalCount,
  } = useOrderFormContext();

  const { zSetLoading, zUserEmailAdd } = useSharedStore();
  const {
    filteredTGA,
    setFilteredTGA,
    checkedItems,
    setCheckedItems,
    checkedItemsHistory,
    setCheckedItemsHistory,
    setOrderForms,
    processOrderForms,
    setProcessOrderForms,
    updateOrderForm,
    processOrderFormAndSetState,
    currentYearAndWeeks,
    setCurrentYearAndWeeks,
    orderFormsDetails,
    setOrderFormsDetails,
  } = useUpdateOrderForm();

  const navigate = useNavigate();

  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");
  const [totalPOCount, setTotalPOCount] = useState<number>(0);
  const [isZeroTga, setIsZeroTga] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [lastSyncDate, setLastSyncDate] = useState<string>("MMMM dd, yyyy");
  const [isBack, setIsBack] = useState(zOrderFormSearch !== "" ? true : false);
  const [previousYearAndWeeks, setPreviousYearAndWeeks] = useState<string[]>(
    []
  );

  const theme = useTheme();

  const handleClear = () => {
    // console.log("handle clear is called");
    setProcessOrderForms([]);
    setOrderForms([]);
    setCurrentYearAndWeeks([]);
    setPreviousYearAndWeeks([]);
    setCheckedItems({});
    setCheckedItemsHistory({});
    zSetIsClearLYTYBaseLine(true);
    zSetBaseLineThisYear(0);
    zSetBaseLineLastYear(0);
    zSetWorksheetHistory([]);
    zSetIsFirstLoad(true);
  };
  // Calculate the rolling average function

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };
  //need ito palitan or i recreate

  const fetchWorkSheet = useCallback(async (sku: string) => {
    try {
      zSetLoading(true); // Start loading
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/WorkSheet/GetWorkSheetDetails?Sku=${sku}&userEmailAdd=${zUserEmailAdd}`,
      };

      const response = await api(config);
      // console.log("response: ", response);
      if (
        response.data &&
        response.data.currentRange &&
        response.data.previousRange
      ) {
        zSetCurrentWeekHighlight(response.data.CurrentWeekHighlight);
        // Use functional updates to avoid stale state issues
        setFilteredTGA(response.data.selectedTGA);
        if (response.data.selectedTGA === 0) {
          setIsZeroTga(true);
        }
        setLastSyncDate(response.data.SyncDate);
        setOrderFormsDetails(response.data.workSheetSkuDetails);
        setCurrentYearAndWeeks(response.data.currentRange);
        // currentYearAndWeek = response.data.currentRange[1];
        zSetCurrentWeek(response.data.currentRange[1]);
        setPreviousYearAndWeeks(response.data.previousRange);
        setOrderForms(response.data.workSheetList);
        console.log(
          "response.data.workSheetList: ",
          response.data.workSheetList
        );
        zSetWorksheetHistory(response.data.workSheetHistory);
        zSetAdjustedOrder(
          response.data &&
            response.data.workSheetHistory[0] &&
            !isNaN(response.data.workSheetHistory[0].AdjustedOrder) &&
            response.data.workSheetHistory[0].AdjustedOrder !== null
            ? response.data.workSheetHistory[0].AdjustedOrder
            : 0
        );

        setTotalPOCount(response.data.totalPOCount);
        // console.log("response.data: ", response.data);

        setIsSnackbarOpen(true);
        setSnackbarSeverity("success");
        setMessage("Sku loaded successfully.");
      } else {
        setLastSyncDate("");
        zSetNextLeadTime("");
        setOrderFormsDetails([]);
        setIsSnackbarOpen(true);
        setSnackbarSeverity("error");
        setMessage("Sku not found or data incomplete.");
      }
    } catch (error) {
      setLastSyncDate("");
      zSetNextLeadTime("");
      setOrderFormsDetails([]);
      setIsSnackbarOpen(true);
      setSnackbarSeverity("error");
      setMessage("An error occurred while fetching the data.");
    } finally {
      zSetIsScroll(true);
      zSetLoading(false); // Stop loading in both success and error scenarios
    }
  }, []);

  const handleSearch = useCallback(
    async (sku: string) => {
      zSetIsOriginalClick(false);
      zSetOrderFormSearch(sku);
      handleClear();
      await getAllMixedSkusBySku(sku);
      // console.log("handleSearch is called");
      await fetchWorkSheet(sku); // Await the execution of fetchWorkSheet
    },
    [handleClear, fetchWorkSheet]
  ); // Dependencies

  const handleChangeCheckBox = useCallback(
    (Week_No: string, checked: boolean) => {
      zSetIsSaveOrder(false);
      setProcessOrderForms((prevOrderForms) => {
        const updatedOrderForms = prevOrderForms.map((item) => {
          if (item.Week_No === Week_No) {
            return { ...item, Is_Checked: checked };
          }
          return item;
        });

        return updatedOrderForms;
      });

      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [Week_No]: checked,
      }));
    },
    []
  );

  const debouncedHCCBOnChange = useCallback(
    debounce((Week_No: string, checked: boolean) => {
      // zSetIsFirstLoad(false)
      handleChangeCheckBox(Week_No, checked); // Call handleChangeCheckBox with checked value directly
    }, 100),
    [handleChangeCheckBox]
  );

  // const handleSuggested = useCallback(
  //   (Week_No: string, event: React.ChangeEvent<HTMLInputElement>) => {
  //     const newValue = Number(event.target.value);
  //     // Update only the item with the matching Week_No
  //     const processedData = processOrderForms.map((item) => {
  //       if (item.Week_No === Week_No) {
  //         return { ...item, SuggestedOrder: newValue };
  //       }
  //       return item;
  //     });
  //     processOrderFormAndSetState(processedData);
  //   },
  //   [processOrderForms]
  // );

  // const debouncedHSOnChange = useCallback(
  //   debounce((Week_No: string, event: React.ChangeEvent<HTMLInputElement>) => {
  //     handleSuggested(Week_No, event); // Calls handleSuggested with the correct arguments
  //   }, 200), // Debouncing for 200ms
  //   [handleSuggested]
  // );

  const handleAdjustment = useCallback(
    (Week_No: string, event: React.ChangeEvent<HTMLInputElement>) => {
      zSetIsSaveOrder(false);

      const rawValue = event.target.value.replace(/(?!^-)\D/g, "");
      // console.log("rawValue: ", rawValue);
      // Convert to number
      const numericValue = rawValue === "" ? 0 : Number(rawValue);
      // Ensure a valid number before setting state
      if (!isNaN(numericValue)) {
        // console.log("nag if");
        event.target.value = formatNumber(numericValue);
      } else {
        // console.log("nag else");
        // setInputValue(zBaseLineLastYear.toString());
        // updateBaseLineLastYear(zBaseLineLastYear.toString()); // Trigger debounced update
      }

      const processedData = processOrderForms.map((item) => {
        if (item.Week_No === Week_No) {
          return { ...item, Adjustment: rawValue === "-" ? 0 : numericValue };
        }
        return item;
      });
      // console.log("processData: ", processedData);
      processOrderFormAndSetState(processedData);
      zSetFocusField(null);
      // Format and update input field
    },
    [processOrderForms]
  );

  const debouncedHAOnChange = useCallback(
    debounce((Week_No: string, event: React.ChangeEvent<HTMLInputElement>) => {
      handleAdjustment(Week_No, event);
    }, 1500),
    [handleAdjustment]
  );

  const fetchData = async () => {
    handleClear();
    await getAllMixedSkusBySku(zOrderFormSearch);
    await fetchWorkSheet(zOrderFormSearch);
    // updateOrderForm();
  };

  useEffect(() => {
    zSetIsSaveOrder(true);
  }, []);

  // for going back with zOrderFormSearch
  useEffect(() => {
    // console.log("useEffect1: ");

    if (zOrderFormSearch !== "" && isBack) {
      const timeoutId = setTimeout(() => {
        fetchData();
        setIsBack(false);
      }, 1000); // Delay of 1000ms (1 second)

      return () => clearTimeout(timeoutId); // Cleanup function to prevent memory leaks
    }
  }, [zOrderFormSearch]);

  useEffect(() => {
    // console.log("filteredTGA: ", filteredTGA);
    if (isZeroTga) {
      setIsZeroTga(false);
    }
    updateOrderForm();
    // console.log(" checkedItems: ", checkedItems);
    // console.log(" zBaseLineLastYear useEffect: ", zBaseLineLastYear);
  }, [
    checkedItems,
    filteredTGA,
    zBaseLineLastYear,
    zBaseLineThisYear,
    isZeroTga,
  ]);

  useEffect(() => {
    if (zIsOriginalClick) {
      updateOrderForm();
    }
  }, [zIsOriginalClick]);

  return (
    <Box
      sx={{
        marginTop: "1px",
        marginLeft: "20px",
        marginRight: "20px",
        flexGrow: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px", color: "#1C2C5A" }}
          >
            Order Form
            {/* {zCurrentWeekSupply} zProjectedWeekSupply: {zProjectedWeekSupply} */}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} />
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
          // marginBottom: "100px",
          position: "sticky",
          top: 0, // Ensures it sticks to the top of the viewport
          zIndex: 10, // Ensures it appears above other elements if necessary
          backgroundColor: "#fff", // Prevents content behind from being visible
        }}
      >
        <Grid container spacing={1} sx={{ mb: 1, alignItems: "center" }}>
          <Grid item xs={12} sm={2}>
            <StyledTableSearchBar onSearch={handleSearch} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <BLLYField type={"text"} label="Last Year Base Line" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <BLTYField type={"text"} label="This Year Base Line" />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Box
              sx={{
                border: "1px solid #1C2C5A", // Border color
                borderRadius: "8px", // Rounded corners
                padding: "8px", // Padding inside the box
                display: "inline-block", // Adjust size to content
                backgroundColor: "#f4f4f4", // Light background color
              }}
            >
              <Typography
                sx={{
                  // paddingTop: "14px",
                  textAlign: "center",
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#1C2C5A",
                }}
              >
                TGA:{" "}
                {typeof filteredTGA === "number" && isFinite(filteredTGA)
                  ? filteredTGA.toFixed(2)
                  : "0.00"}
                %
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              sx={{
                // paddingTop: "14px",
                textAlign: "center",
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Next lead time:{" "}
              <span
                style={{
                  backgroundColor: "yellow",
                  color: theme.palette.text.primary,
                }}
              >
                {zNextLeadTime}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ ml: "auto" }}>
            <Typography
              sx={{
                // paddingTop: "14px",
                textAlign: "center",
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "bold",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Last Sync Date:{" "}
              <span
                style={{
                  color: theme.palette.text.primary,
                }}
              >
                {zDateModified && zDateModified.split(" ")[0]}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ mb: 1, alignItems: "center" }}>
          <Grid item xs={12} sm={10.3}>
            {zMixedSkuNumbers &&
              zMixedSkuNumbers.length > 0 &&
              zMixedSkuNumbers.map((row, index) => {
                const match = row.match(/^\d+/);
                const sku = match ? match[0] : "";

                if (index === 0) {
                  return (
                    <>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                          navigate("/order-analyst/mix-container-summary")
                        }
                        sx={{ mb: 0.5, mr: 1 }}
                      >
                        <Typography sx={{ fontSize: "10px" }}>
                          Summary
                        </Typography>
                      </Button>
                      <Button
                        color={zOrderFormSearch === sku ? "inherit" : "primary"}
                        variant="outlined"
                        onClick={() => handleSearch(sku)}
                        sx={
                          zOrderFormSearch === sku
                            ? {
                                mb: 0.5,
                                mr: 1,
                                color: "blue",
                                borderColor: "blue",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 0, 139, 0.1)", // dark blue with transparency
                                  borderColor: "blue",
                                },
                              }
                            : {
                                mb: 0.5,
                                mr: 1,
                              }
                        }
                      >
                        <Typography sx={{ fontSize: "10px" }}>{row}</Typography>
                      </Button>
                    </>
                  );
                }

                return (
                  <Button
                    color={zOrderFormSearch === sku ? "inherit" : "primary"}
                    variant="outlined"
                    onClick={() => handleSearch(sku)}
                    sx={
                      zOrderFormSearch === sku
                        ? {
                            mb: 0.5,
                            mr: 1,
                            color: "blue",
                            borderColor: "blue",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 139, 0.1)", // dark blue with transparency
                              borderColor: "blue",
                            },
                          }
                        : {
                            mb: 0.5,
                            mr: 1,
                          }
                    }
                  >
                    <Typography sx={{ fontSize: "10px" }}>{row}</Typography>
                  </Button>
                );
              })}
          </Grid>
          <Grid item xs={12} sm={1.7}>
            {zPalletTotalCount && zPalletTotalCount > -1 && (
              <>
                <Typography sx={{ fontSize: "18px" }}>
                  {zPalletTotalCount}
                </Typography>{" "}
                <Typography sx={{ fontSize: "10px" }}>Total Pallets</Typography>
              </>
            )}
          </Grid>
        </Grid>

        {orderFormsDetails && orderFormsDetails.length > 0 && (
          <AccordionOrderForm orderFormsDetails={orderFormsDetails[0]} />
        )}
      </Box>
      <Divider />

      <OrderFormTblList
        orderFormsDetails={
          orderFormsDetails && orderFormsDetails.length > 0
            ? orderFormsDetails[0]
            : null
        }
        checkedItems={
          Object.keys(checkedItemsHistory).length > 0
            ? { ...checkedItemsHistory, ...checkedItems }
            : { ...checkedItems }
        }
        currentYearAndWeeks={currentYearAndWeeks}
        previousYearAndWeeks={previousYearAndWeeks}
        orderFormList={zOrderFormList}
        trigger={orderFormsDetails[0]?.Trigger}
        totalPOCount={totalPOCount}
        debouncedHAOnChange={debouncedHAOnChange}
        debouncedHCCBOnChange={debouncedHCCBOnChange}
        updateOrderForm={updateOrderForm}
      />

      {/* Snackbar for displaying messages */}
      <StyledSnackBar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={message}
      />
    </Box>
  );
};

export default OrderFormPage;
