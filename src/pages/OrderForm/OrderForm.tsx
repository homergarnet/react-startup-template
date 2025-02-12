import {
  Box,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
  Checkbox,
  TableContainer,
} from "@mui/material";
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close"; // Icon for "X"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Icon for empty box
import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import React from "react";
import { AxiosRequestConfig } from "axios";
import api from "../../../Config/AxiosConfig";
import StyledTableCellHeader from "../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
import StyledTableCellBody from "../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import StyledTableCellNoData from "../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledTableCellTextField from "../../../Components/ReusableComponents/TableComponents/StyledTableCellTextField";
import StyledSnackBar from "../../../Components/ReusableComponents/NotificationComponents/StyledAlert";
import IOrderForm from "./Interface/IOrderForm";
import IOrderFormDetails from "./Interface/IOrderFormDetails";
import StyledTableSearchBar from "../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";
import StyledLabel from "../../../Components/ReusableComponents/LabelComponent/StyledLabel";
import StyledIcon from "../../../Components/ReusableComponents/IconComponents/StyledIcon";
import StyledTextField from "../../../Components/ReusableComponents/TextFieldComponents/StyledTextField";
import useOrderFormContext from "../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import { compareWeekNumbers } from "../../../utils/compareWeekNumbers";
import { incrementWeeks } from "../../../utils/incrementWeeks";
import { formatDate } from "../../../utils/formatDate";
import debounce from "lodash.debounce";
import useBaseLineLastYear from "./hooks/useBaseLineLastYear";
import useBaseLineThisYear from "./hooks/useBaseLineThisYear";
import { getCurrentYearWeekReducedByDays } from "../../../utils/getCurrentYearWeekReducedByDays";
import useSharedStore from "../../../store/sharedStore";

const OrderForm = () => {
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [orderForms, setOrderForms] = useState<IOrderForm[]>(
    [] as IOrderForm[]
  ); //Initial & Original Data Load
  const [processOrderForms, setProcessOrderForms] = useState<IOrderForm[]>(
    [] as IOrderForm[]
  ); //Displayed Data
  const [oderFormsDetails, setOrderFormsDetails] = useState<
    IOrderFormDetails[]
  >([] as IOrderFormDetails[]);
  const [lastSyncDate, setLastSyncDate] = useState<string>("MMMM dd, yyyy");
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState("600px");
  const [currentYearAndWeeks, setCurrentYearAndWeeks] = useState<string[]>([]);

  let currentYearAndWeek: string = "";
  const isAllowedRef = useRef(false);
  let isAllowedCtr: number = 0;
  const [previousYearAndWeeks, setPreviousYearAndWeeks] = useState<string[]>(
    []
  );
  const [lowestCheckedWeekNo, setLowestCheckedWeekNo] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [filteredTGA, setFilteredTGA] = useState<number>(0);
  const { baseLineLastYear, debouncedBLYOnChange } = useBaseLineLastYear("");
  const { baseLineThisYear, debouncedBTYOnChange } = useBaseLineThisYear("");
  const [processingComplete, setProcessingComplete] = useState(false);
  const formattedTGA: string =
    typeof filteredTGA === "number" ? filteredTGA.toFixed(2) : "0.00"; // Fallback if filteredTGA is not a number
  const initialized = useRef(false);

  const {
    zBaseLineLastYear,
    zSetBaseLineLastYear,
    zBaseLineThisYear,
    zSetBaseLineThisYear,
  } = useOrderFormContext();

  const { zSetLoading } = useSharedStore();

  const handleClear = () => {
    // console.log("handle clear is called");
    initialized.current = false;
    setLowestCheckedWeekNo([]);
    setProcessOrderForms([]);
    setOrderForms([]);
    setCurrentYearAndWeeks([]);
    setPreviousYearAndWeeks([]);
    setCheckedItems({});
    zSetBaseLineThisYear(0);
    zSetBaseLineLastYear(0);
  };

  // Calculate the rolling average function
  const processOrderFormAndSetState = (data: IOrderForm[]): void => {
    const defaultThisYearWeekNo = getCurrentYearWeekReducedByDays(7, true);
    // Process the data
    const processedData = data.map((item, index) => {
      const adjustment = item.Adjustment != null ? item.Adjustment : 0;
      //UI DATA
      const LastYearSales =
        item.LY_Sales_Quantity_Sold > (baseLineLastYear || 0)
          ? item.LY_Sales_Quantity_Sold
          : baseLineLastYear || 0;
      const ThisYearSales =
        item.Sales_Quantity_Sold > (baseLineThisYear || 0)
          ? item.Sales_Quantity_Sold
          : baseLineThisYear || 0;
      const Growth = ((ThisYearSales - LastYearSales) / LastYearSales) * 100;
      // Update TrendGrowthAverage
      const thisYearStart = Math.max(0, index - 12 + 1);
      const thisYearEnd = index;
      const thisYearRange = data
        .slice(thisYearStart, thisYearEnd + 1)
        .filter((order) => order.Is_Checked === false);
      const thisYearSum = thisYearRange.reduce(
        (acc, item) =>
          acc +
          (item.TrendGrowthAverage === null
            ? item.Growth
            : item.TrendGrowthAverage),
        0
      );
      const thisYearTga = isFinite(thisYearSum / thisYearRange.length / 100)
        ? thisYearSum / thisYearRange.length / 100
        : 0;

      // Update SalesForecast
      const thisYearTargetWeek = defaultThisYearWeekNo;
      const suggestedOrder = item.SuggestedOrder || 0;
      const sForecast =
        item.Week_No < thisYearTargetWeek
          ? LastYearSales * thisYearTga + LastYearSales + adjustment
          : LastYearSales * (filteredTGA / 100) +
            LastYearSales +
            item.Adjustment;

      let Sales_Forecast = 0;
      let endingInventoryEstimate =
        item.EndingInventoryEstimate + suggestedOrder;
      if (typeof sForecast === "number" && !isNaN(sForecast)) {
        Sales_Forecast = Number(sForecast.toFixed(2));
      }

      return {
        ...item,
        TrendGrowthAverage: Growth,
        Sales_Forecast: Sales_Forecast,
        EndingInventoryEstimate: endingInventoryEstimate,
      };
    });

    // console.log("called: ", processedData);
    // Update the state with the processed data and set processing complete flag
    setProcessOrderForms(processedData);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const calculateAverageGrowth = () => {
    // console.log("calculateAverageGrowth is called");
    if (!currentYearAndWeeks || currentYearAndWeeks.length < 2) {
      setFilteredTGA(0.0);
      return;
    }
    const [startRange, endRange] = currentYearAndWeeks;
    if (!startRange || !endRange) {
      setFilteredTGA(0.0);
      return;
    }

    // Extract and convert week numbers from currentWeekNumber
    const minWeek = parseFloat(startRange.split(".")[1]);
    let maxWeek = parseFloat(endRange.split(".")[1]) - 1; // Reduce maxWeek by 1

    // Filter unchecked items excluding the current week numbers
    const uncheckedItems = orderForms.filter(
      (item) => item.Week_No >= startRange && item.Week_No <= endRange
    ); // Use to convert the week numbers of the original 12 filtered rows
    const unckeckedItemsProcess = processOrderForms.filter(
      (item) =>
        item.Week_No >= startRange &&
        item.Week_No <= endRange &&
        !item.Is_Checked
    );

    if (unckeckedItemsProcess.length === 0) {
      setFilteredTGA(0.0);
      return;
    }

    // Convert week numbers to numbers for comparison
    const yearNumbers = uncheckedItems.map((item) =>
      parseFloat(item.Week_No.split(".")[0])
    );
    const weekNumbers = unckeckedItemsProcess.map((item) =>
      parseFloat(item.Week_No.split(".")[1])
    );

    // Find missing weeks
    let lowestMissingWeek = null;
    let increment = 1;
    let position = 0;
    for (let week = minWeek; week <= maxWeek; week++) {
      if (!weekNumbers.includes(week)) {
        if (lowestMissingWeek === null || week < lowestMissingWeek) {
          lowestMissingWeek = week;
        }
        position = increment;
      }
      increment++;
    }

    // Update state
    if (lowestMissingWeek !== null) {
      setLowestCheckedWeekNo([yearNumbers[position] + "." + lowestMissingWeek]);
    }

    // Calculate total growth and average growth
    const totalGrowth = unckeckedItemsProcess.reduce(
      (sum, item) => sum + item.TrendGrowthAverage,
      0
    );
    const averageGrowth = totalGrowth / unckeckedItemsProcess.length;
    setFilteredTGA(averageGrowth);
  };

  const updateOrderForm = () => {
    // console.log("event happens ng updateOrderForm");
    if (processingComplete) return; // Prevent multiple updates
    setProcessingComplete(true);

    const orderFormList =
      processOrderForms.length === 0 ? orderForms : processOrderForms;
    processOrderFormAndSetState(orderFormList);
    calculateAverageGrowth();

    setProcessingComplete(false);
  };

  const fetchWorkSheet = useCallback(async (sku: string) => {
    try {
      zSetLoading(true); // Start loading
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/WorkSheet/GetWorkSheetDetails?Sku=${sku}`,
      };

      const response = await api(config);
      // console.log("response: ", response);
      if (
        response.data &&
        response.data.currentRange &&
        response.data.previousRange
      ) {
        // Use functional updates to avoid stale state issues
        setFilteredTGA(response.data.selectedTGA);
        setLastSyncDate(response.data.SyncDate);
        setOrderFormsDetails(response.data.workSheetSkuDetails);
        setCurrentYearAndWeeks(response.data.currentRange);
        currentYearAndWeek = response.data.currentRange[1];
        setPreviousYearAndWeeks(response.data.previousRange);
        setOrderForms(response.data.workSheetList);
        setTimeout(() => {
          setIsSnackbarOpen(true);
          setSnackbarSeverity("success");
          setMessage("Sku loaded successfully.");
        }, 1100);
      } else {
        setIsSnackbarOpen(true);
        setSnackbarSeverity("error");
        setMessage("Sku not found or data incomplete.");
      }
    } catch (error) {
      alert("test");
      setIsSnackbarOpen(true);
      setSnackbarSeverity("error");
      setMessage("An error occurred while fetching the data.");
    } finally {
      setTimeout(() => {
        zSetLoading(false); // Stop loading in both success and error scenarios
      }, 1100);
    }
  }, []);

  const handleSearch = async (sku: string) => {
    handleClear();
    // console.log("handleSearch is called");
    await fetchWorkSheet(sku); // Await the execution of fetchWorkSheet
  };

  const handleChangeCheckBox = useCallback(
    (Week_No: string, event: React.ChangeEvent<HTMLInputElement>) => {
      setProcessOrderForms((prevOrderForms) => {
        const updatedOrderForms = prevOrderForms.map((item) => {
          if (item.Week_No === Week_No) {
            return { ...item, Is_Checked: event.target.checked };
          }
          return item;
        });

        return updatedOrderForms;
      });

      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [Week_No]: event.target.checked,
      }));
    },
    []
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
      const newValue = Number(event.target.value);
      // console.log("event happens ng handleAdjustment");
      // Update only the item with the matching Week_No
      const processedData = processOrderForms.map((item) => {
        if (item.Week_No === Week_No) {
          return { ...item, Adjustment: newValue };
        }
        return item;
      });
      processOrderFormAndSetState(processedData);
    },
    [processOrderForms]
  );

  const debouncedHAOnChange = useCallback(
    debounce((Week_No: string, event: React.ChangeEvent<HTMLInputElement>) => {
      handleAdjustment(Week_No, event); // Calls handleSuggested with the correct arguments
    }, 200), // Debouncing for 200ms
    [handleAdjustment]
  );
  // const StyledScrollBoxDynamic = styled(Box)<{ dynamicHeight?: string }>(
  //   ({ dynamicHeight }) => ({
  //     overflowY: "auto",
  //     height: dynamicHeight || "calc(100vh - 190px)", // Use dynamicHeight prop or fallback to default

  //     /* Custom Scrollbar Styles */
  //     scrollbarWidth: "thin",
  //     "&::-webkit-scrollbar": {
  //       width: "8px",
  //     },
  //     "&::-webkit-scrollbar-thumb": {
  //       backgroundColor: "#2b4b81",
  //       borderRadius: "4px",
  //     },
  //     "&::-webkit-scrollbar-track": {
  //       backgroundColor: "transparent",
  //     },
  //   })
  // );

  const computeValue = (row: IOrderForm): number => {
    // console.log(
    //   `${row.Week_No} : ${row.Prev_Sales_On_Hand} - ${row.Sales_Forecast} + ${row.Latest_Expectation_Eta_Ordered} + ${row.Actual_Received_PO_Total}`
    // );
    return (
      row.Prev_Sales_On_Hand -
      row.Sales_Forecast +
      row.Latest_Expectation_Eta_Ordered +
      row.Actual_Received_PO_Total
    );
  };

  useEffect(() => {
    // console.log("this is called useEffect");
    // console.log("useEffect is called filteredTGA: ", filteredTGA);

    const updatedForms = [...processOrderForms];
    const defaultThisYearWeekNo = getCurrentYearWeekReducedByDays(0, true);
    // Find the index of the week 2024.39
    const startIndex = updatedForms.findIndex(
      (row) => row.Week_No === defaultThisYearWeekNo
    );

    // Proceed only if current week exists
    if (startIndex !== -1 && !initialized.current) {
      for (let i = startIndex; i < updatedForms.length; i++) {
        const currentRow = updatedForms[i];

        // Only compute if current row has a valid Prev_Sales_On_Hand
        if (currentRow.Prev_Sales_On_Hand !== null) {
          const calculatedValue = computeValue(currentRow);

          // If there's a next row, save it there
          if (i < updatedForms.length - 1) {
            const nextRow = updatedForms[i + 1];
            nextRow.Prev_Sales_On_Hand = calculatedValue; // Save it for the next week
          } else {
            // If it's the last row, set its own Prev_Sales_On_Hand to calculatedValue
            currentRow.Prev_Sales_On_Hand = calculatedValue; // Save it for itself
            initialized.current = true;
          }
        }
      }
    }

    setProcessOrderForms(updatedForms);
    updateOrderForm();
  }, [checkedItems, filteredTGA, zBaseLineLastYear, zBaseLineThisYear]);

  useEffect(() => {
    if (expanded) {
      setHeight("440px"); // Set height when expanding
    } else {
      setHeight("600px"); // Set height when collapsing
    }
  }, [expanded]);

  return (
    <Box
      sx={{
        marginTop: "16px",
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
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} />
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <StyledTableSearchBar onSearch={handleSearch} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <StyledTextField
              type="text"
              label="Last Year Base Line"
              onChange={debouncedBLYOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <StyledTextField
              type="text"
              label="This Year Base Line"
              onChange={debouncedBTYOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              sx={{
                paddingTop: "14px",
                textAlign: "center",
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#1C2C5A",
              }}
            >
              Last Sync Date: {lastSyncDate}
            </Typography>
          </Grid>
        </Grid>
        <Paper
          elevation={3}
          sx={{
            maxWidth: "100%",
            borderRadius: "99px",
          }}
        >
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded((prev) => !prev)}
            sx={{ boxShadow: "1px 5px 4px -1px rgba(0,0,0,0.3)" }}
          >
            <AccordionSummary>
              <Grid container alignItems="center">
                <>
                  <Grid item xs={12} sm={3}>
                    <Typography
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#1C2C5A",
                        textAlign: "center",
                      }}
                    >
                      SKU Number:{" "}
                      {oderFormsDetails.length > 0
                        ? oderFormsDetails[0].SkuNumber
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#1C2C5A",
                        textAlign: "center",
                      }}
                    >
                      TGA : {formattedTGA}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#1C2C5A",
                        textAlign: "center",
                      }}
                    >
                      Description:{" "}
                      {oderFormsDetails.length > 0
                        ? oderFormsDetails[0].ItemDescription
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <StyledIcon
                      style={{
                        transform: `rotate(${expanded ? 360 : 0}deg)`,
                      }}
                    >
                      {expanded ? (
                        <ArrowDropUpIcon
                          sx={{ color: "#1C2C5A", fontSize: "30px" }}
                        />
                      ) : (
                        <ArrowDropDownIcon
                          sx={{ color: "#1C2C5A", fontSize: "30px" }}
                        />
                      )}
                    </StyledIcon>
                  </Grid>
                </>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    SHELF LIFE (WEEKS):{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].ShelfLifeWeeks
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    VENDOR NAME:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].VendorName
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    UNITS PER PALLET:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].UnitPerPallet
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    TRIGGER (WEEKS):{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].Trigger
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    FOREIGN VENDOR CODE:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].ForeignVendorCode
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    PALLETS PER CONTAINER:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].NoOfPalletsPerContainer
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    BUILD TO (WEEKS):{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].BuildTo
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    FOREIGN VENDOR NAME:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].ForeignVendorName
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    UNITS PER CONTAINER:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].UnitsPerContainer
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    TOTAL LEAD TIME (WEEKS):{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].TotalOrderLeadTime
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    COUNTRY OF ORIGIN:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].CountryOrigin
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    CONTAINER LOADING:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].ContainerLoad
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    PO DAY:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].PoDay
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    CURRENT STATUS:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].ItemStatus
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    CONTAINER SIZE:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].ContainerSize
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    BUYER NAME:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].Buyer
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    UNIT PER CASE:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].UnitPerCase
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    MOQ:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].Moq
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    VENDOR CODE:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].VendorCode
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    CASE PER PALLET:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].CasePerPallet
                      : "N/A"}
                  </StyledLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledLabel>
                    MIX LOAD SKU's:{" "}
                    {oderFormsDetails.length > 0
                      ? oderFormsDetails[0].MixLoadSkus
                      : "N/A"}
                  </StyledLabel>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
      <Divider />
      <TableContainer component={Paper} sx={{ height: "600px" }}>
        <Table
          sx={{ backgroundColor: "#ffffff" }}
          stickyHeader
          aria-label="spanning table"
        >
          <TableHead
            sx={{
              zIndex: 3,
              backgroundColor: "#4761AD",
              position: "sticky",
              top: 0,
            }}
          >
            <TableRow>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
                colSpan={2}
                rowSpan={2}
              >
                Week No.
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
                colSpan={2}
              >
                Period
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
                colSpan={1}
              >
                Purchase Order
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
                colSpan={1}
              >
                Suggested Order
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
                colSpan={3}
              >
                Sales
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
                colSpan={2}
              >
                Ending Inventory
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
                rowSpan={2}
              >
                Ending Inv Week Supply
              </StyledTableCellHeader>
            </TableRow>
            <TableRow>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                  minWidth: "35px",
                }}
              >
                From
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                  minWidth: "35px",
                }}
              >
                To
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
              >
                Incoming
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
              >
                Suggested
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
              >
                Forecast
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
              >
                Adjustment
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
              >
                Actual
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
              >
                Estimate
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={{
                  textAlign: "center",
                  border: "solid 1px",
                  borderColor: "#ffffff",
                }}
              >
                Actual
              </StyledTableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {processOrderForms && processOrderForms.length === 0 ? (
              <TableRow sx={{ "& td": { border: 0 } }}>
                <StyledTableCellNoData colSpan={11} align="center">
                  No data found
                </StyledTableCellNoData>
              </TableRow>
            ) : (
              processOrderForms.map((row, index) => {
                console.log("index: ", index);
                console.log("row.Week_No: ", row.Week_No);
                // Extracting year and week values
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

                // Range check
                const ThisYearWithinRange =
                  (rowYear > yearA ||
                    (rowYear === yearA && rowWeek >= weekA)) &&
                  (rowYear < yearB || (rowYear === yearB && rowWeek <= weekB));
                const isDisabled = !ThisYearWithinRange;

                // Determine if we should apply the replacement logic
                const thisYearBaseLine =
                  rowYear === yearB && rowWeek >= 1 && rowWeek <= weekB;

                const lastYearBaseLine =
                  rowYear === yearC && rowWeek >= 1 && rowWeek <= weekC;

                const SalesQuantitySold = thisYearBaseLine
                  ? row.Sales_Quantity_Sold > baseLineThisYear
                    ? row.Sales_Quantity_Sold
                    : baseLineThisYear
                  : lastYearBaseLine
                  ? row.Sales_Quantity_Sold > baseLineLastYear
                    ? row.Sales_Quantity_Sold
                    : baseLineLastYear
                  : row.Sales_Quantity_Sold;

                const prevWeekSalesOnHand =
                  index != 0 &&
                  processOrderForms[index - 1].Sales_On_Hand != null
                    ? Number.isNaN(processOrderForms[index - 1].Sales_On_Hand)
                      ? 0
                      : processOrderForms[index - 1].Sales_On_Hand
                    : 0;

                const prevWeekEndingInventoryEstimate =
                  index != 0 &&
                  processOrderForms[index - 1].EndingInventoryEstimate != null
                    ? Number.isNaN(
                        processOrderForms[index - 1].EndingInventoryEstimate
                      )
                      ? 0
                      : processOrderForms[index - 1].EndingInventoryEstimate
                    : 0;

                const salesForecast =
                  row.Sales_Forecast == null ||
                  Number.isNaN(row.Sales_Forecast) ||
                  !isFinite(row.Sales_Forecast)
                    ? 0
                    : row.Sales_Forecast;

                const actualReceivedPoTotal =
                  row.Actual_Received_PO_Total == null ||
                  Number.isNaN(row.Actual_Received_PO_Total) ||
                  !isFinite(row.Actual_Received_PO_Total)
                    ? 0
                    : row.Actual_Received_PO_Total;

                let suggestedOrder = 0;

                const latestExpectationEtaOrdered =
                  row.Latest_Expectation_Eta_Ordered == null ||
                  Number.isNaN(row.Latest_Expectation_Eta_Ordered) ||
                  !isFinite(row.Latest_Expectation_Eta_Ordered)
                    ? 0
                    : row.Latest_Expectation_Eta_Ordered;

                //get the prevWeekEndingInventoryEstimate when prevWeekSalesOnHand is 0
                const prevWeekEndInv =
                  prevWeekSalesOnHand === 0 &&
                  prevWeekEndingInventoryEstimate > 0
                    ? prevWeekEndingInventoryEstimate
                    : prevWeekSalesOnHand;

                const calculatedValue =
                  prevWeekEndInv -
                  salesForecast +
                  actualReceivedPoTotal +
                  suggestedOrder +
                  latestExpectationEtaOrdered;

                // Determine display value
                let endingInvEstimate = calculatedValue.toFixed(2);

                const endingInvEstimateNum =
                  !isNaN(calculatedValue) && isFinite(calculatedValue)
                    ? calculatedValue
                    : 0;

                row.EndingInventoryEstimate = calculatedValue;

                let endingInvWs = 0;

                if (endingInvEstimateNum > 0) {
                  let lessThanVal = 0;
                  let greaterThanVal = 0;
                  const processOrderFormsSlice = processOrderForms.slice(
                    index + 1
                  );
                  let ctr = 0;
                  processOrderFormsSlice.some((value, index2) => {
                    ctr++;
                    // console.log("index2: ", index2);
                    const salesForecast =
                      !isNaN(value.Sales_Forecast) &&
                      isFinite(value.Sales_Forecast)
                        ? Math.round(value.Sales_Forecast)
                        : 0;

                    if (
                      lessThanVal < endingInvEstimateNum &&
                      lessThanVal + salesForecast < endingInvEstimateNum
                    ) {
                      lessThanVal += salesForecast;
                    }

                    if (greaterThanVal <= endingInvEstimateNum) {
                      greaterThanVal += salesForecast;
                    }

                    if (
                      greaterThanVal > endingInvEstimateNum ||
                      index2 === processOrderFormsSlice.length - 1
                    ) {
                      const lessThanEstimate =
                        endingInvEstimateNum - lessThanVal;
                      const greaterThanEstimate =
                        greaterThanVal - endingInvEstimateNum;

                      if (greaterThanEstimate < lessThanEstimate) {
                        endingInvWs = ctr;
                        console.log("if endingInvWs: ", endingInvWs);
                      } //minus one when lessThanEstimate is closest to the estimate number
                      else {
                        // endingInvWs = endingInvWs + 1;
                        endingInvWs = ctr - 1;
                        console.log("else endingInvWs: ", endingInvWs);
                      }

                      return true; // Stops the loop
                    }
                    return false;
                  });
                } else {
                  // console.log("not entered");
                }

                //to prevent the first compareWeekNumbers highlight
                if (
                  row.Week_No >= currentYearAndWeeks[1] &&
                  isAllowedCtr < 2 &&
                  compareWeekNumbers(row.Week_No, currentYearAndWeek)
                ) {
                  // console.log("pumasok dito");
                  isAllowedRef.current = true;
                  isAllowedCtr += 1;
                  // console.log("isAllowedCtr: ", isAllowedCtr);
                  if (isAllowedCtr === 1) {
                    const incrementedValue = incrementWeeks(
                      row.Week_No,
                      oderFormsDetails[0].TotalOrderLeadTime - 1
                    ); // Derive the next value

                    currentYearAndWeek = incrementedValue;
                  }
                }
                if (
                  row.Week_No >= currentYearAndWeeks[1] &&
                  isAllowedRef.current &&
                  isAllowedCtr >= 2 &&
                  compareWeekNumbers(row.Week_No, currentYearAndWeek)
                ) {
                  // console.log("entered index: ", index);
                  if (endingInvWs <= oderFormsDetails[0].BuildTo) {
                    console.log("entered here");
                    suggestedOrder = oderFormsDetails[0].Moq;
                    const prevWeekSalesOnHand =
                      index != 0 &&
                      processOrderForms[index - 1].Sales_On_Hand != null
                        ? Number.isNaN(
                            processOrderForms[index - 1].Sales_On_Hand
                          )
                          ? 0
                          : processOrderForms[index - 1].Sales_On_Hand
                        : 0;

                    const prevWeekEndingInventoryEstimate =
                      index != 0 &&
                      processOrderForms[index - 1].EndingInventoryEstimate !=
                        null
                        ? Number.isNaN(
                            processOrderForms[index - 1].EndingInventoryEstimate
                          )
                          ? 0
                          : processOrderForms[index - 1].EndingInventoryEstimate
                        : 0;

                    const salesForecast =
                      row.Sales_Forecast == null ||
                      Number.isNaN(row.Sales_Forecast) ||
                      !isFinite(row.Sales_Forecast)
                        ? 0
                        : row.Sales_Forecast;

                    const actualReceivedPoTotal =
                      row.Actual_Received_PO_Total == null ||
                      Number.isNaN(row.Actual_Received_PO_Total) ||
                      !isFinite(row.Actual_Received_PO_Total)
                        ? 0
                        : row.Actual_Received_PO_Total;

                    const latestExpectationEtaOrdered =
                      row.Latest_Expectation_Eta_Ordered == null ||
                      Number.isNaN(row.Latest_Expectation_Eta_Ordered) ||
                      !isFinite(row.Latest_Expectation_Eta_Ordered)
                        ? 0
                        : row.Latest_Expectation_Eta_Ordered;

                    //get the prevWeekEndingInventoryEstimate when prevWeekSalesOnHand is 0
                    const prevWeekEndInv =
                      prevWeekSalesOnHand === 0 &&
                      prevWeekEndingInventoryEstimate > 0
                        ? prevWeekEndingInventoryEstimate
                        : prevWeekSalesOnHand;

                    const calculatedValue =
                      prevWeekEndInv -
                      salesForecast +
                      actualReceivedPoTotal +
                      suggestedOrder +
                      latestExpectationEtaOrdered;

                    endingInvEstimate = calculatedValue.toFixed(2);

                    const endingInvEstimateNum =
                      !isNaN(calculatedValue) && isFinite(calculatedValue)
                        ? calculatedValue
                        : 0;

                    row.EndingInventoryEstimate = calculatedValue;

                    if (endingInvEstimateNum > 0) {
                      let lessThanVal = 0;
                      let greaterThanVal = 0;
                      const processOrderFormsSlice = processOrderForms.slice(
                        index + 1
                      );
                      let ctr = 0;
                      processOrderFormsSlice.some((value, index2) => {
                        ctr++;
                        // console.log("index2: ", index2);
                        const salesForecast =
                          !isNaN(value.Sales_Forecast) &&
                          isFinite(value.Sales_Forecast)
                            ? Math.round(value.Sales_Forecast)
                            : 0;

                        if (
                          lessThanVal < endingInvEstimateNum &&
                          lessThanVal + salesForecast < endingInvEstimateNum
                        ) {
                          lessThanVal += salesForecast;
                        }

                        if (greaterThanVal <= endingInvEstimateNum) {
                          greaterThanVal += salesForecast;
                        }

                        if (
                          greaterThanVal > endingInvEstimateNum ||
                          index2 === processOrderFormsSlice.length - 1
                        ) {
                          const lessThanEstimate =
                            endingInvEstimateNum - lessThanVal;
                          const greaterThanEstimate =
                            greaterThanVal - endingInvEstimateNum;

                          if (greaterThanEstimate < lessThanEstimate) {
                            endingInvWs = ctr;
                            console.log("if endingInvWs: ", endingInvWs);
                          } //minus one when lessThanEstimate is closest to the estimate number
                          else {
                            // endingInvWs = endingInvWs + 1;
                            endingInvWs = ctr - 1;
                            console.log("else endingInvWs: ", endingInvWs);
                          }

                          return true; // Stops the loop
                        }
                        return false;
                      });
                    } else {
                      // console.log("not entered");
                    }
                  } else {
                    suggestedOrder = 0;
                  }

                  const incrementedValue = incrementWeeks(
                    row.Week_No,
                    oderFormsDetails[0].TotalOrderLeadTime - 1
                  ); // Derive the next value

                  currentYearAndWeek = incrementedValue;

                  return (
                    <TableRow
                      key={row.Week_No}
                      sx={{
                        "& td": { border: 0 },
                        ...(isDisabled && {
                          opacity: 0.5,
                          pointerEvents: "none",
                        }),
                      }}
                      style={{
                        backgroundColor: "yellow",
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
                          onChange={(event) =>
                            handleChangeCheckBox(row.Week_No, event)
                          } // Update state on change
                          disabled={isDisabled} // Optionally disable checkbox if row is disabled
                          icon={<CheckBoxOutlineBlankIcon />} // Custom unchecked icon
                          checkedIcon={<CloseIcon sx={{ color: "red" }} />} // Custom checked icon ("X")
                        />
                      </StyledTableCellBody>
                      <StyledTableCellBody className="Week_No">
                        {row.Week_No}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {formatDate(row.Week_From)}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {formatDate(row.Week_To)}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {row.Original_PO_Eta}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {suggestedOrder}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {Number(row.Sales_Forecast) > 0 &&
                        !isNaN(row.Sales_Forecast) &&
                        isFinite(row.Sales_Forecast)
                          ? row.Sales_Forecast
                          : "-"}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        <StyledTableCellTextField
                          type="number"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            debouncedHAOnChange(row.Week_No, e)
                          } // Explicitly typing the event
                        />
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {SalesQuantitySold}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {isNaN(parseFloat(endingInvEstimate)) ||
                        parseFloat(endingInvEstimate) < 0
                          ? "-"
                          : endingInvEstimate}
                      </StyledTableCellBody>
                      <StyledTableCellBody
                        className={
                          row.Sales_On_Hand
                            ? "Sales_On_Hand"
                            : "Sales_On_Hand_Null"
                        }
                      >
                        {row.Sales_On_Hand}
                      </StyledTableCellBody>

                      <StyledTableCellBody
                        style={{
                          color:
                            endingInvWs < oderFormsDetails[0].BuildTo + 1
                              ? "red"
                              : "",
                        }}
                      >
                        {endingInvWs}
                      </StyledTableCellBody>
                    </TableRow>
                  );
                } else {
                  // console.log("entered index: ", index);
                  if (
                    row.Week_No >= currentYearAndWeeks[1] &&
                    isAllowedRef.current &&
                    isAllowedCtr >= 2 &&
                    endingInvWs <= oderFormsDetails[0].BuildTo
                  ) {
                    suggestedOrder = oderFormsDetails[0].Moq;
                    const prevWeekSalesOnHand =
                      index != 0 &&
                      processOrderForms[index - 1].Sales_On_Hand != null
                        ? Number.isNaN(
                            processOrderForms[index - 1].Sales_On_Hand
                          )
                          ? 0
                          : processOrderForms[index - 1].Sales_On_Hand
                        : 0;

                    const prevWeekEndingInventoryEstimate =
                      index != 0 &&
                      processOrderForms[index - 1].EndingInventoryEstimate !=
                        null
                        ? Number.isNaN(
                            processOrderForms[index - 1].EndingInventoryEstimate
                          )
                          ? 0
                          : processOrderForms[index - 1].EndingInventoryEstimate
                        : 0;

                    const salesForecast =
                      row.Sales_Forecast == null ||
                      Number.isNaN(row.Sales_Forecast) ||
                      !isFinite(row.Sales_Forecast)
                        ? 0
                        : row.Sales_Forecast;

                    const actualReceivedPoTotal =
                      row.Actual_Received_PO_Total == null ||
                      Number.isNaN(row.Actual_Received_PO_Total) ||
                      !isFinite(row.Actual_Received_PO_Total)
                        ? 0
                        : row.Actual_Received_PO_Total;

                    const latestExpectationEtaOrdered =
                      row.Latest_Expectation_Eta_Ordered == null ||
                      Number.isNaN(row.Latest_Expectation_Eta_Ordered) ||
                      !isFinite(row.Latest_Expectation_Eta_Ordered)
                        ? 0
                        : row.Latest_Expectation_Eta_Ordered;

                    //get the prevWeekEndingInventoryEstimate when prevWeekSalesOnHand is 0
                    const prevWeekEndInv =
                      prevWeekSalesOnHand === 0 &&
                      prevWeekEndingInventoryEstimate > 0
                        ? prevWeekEndingInventoryEstimate
                        : prevWeekSalesOnHand;

                    const calculatedValue =
                      prevWeekEndInv -
                      salesForecast +
                      actualReceivedPoTotal +
                      suggestedOrder +
                      latestExpectationEtaOrdered;

                    endingInvEstimate = calculatedValue.toFixed(2);

                    const endingInvEstimateNum =
                      !isNaN(calculatedValue) && isFinite(calculatedValue)
                        ? calculatedValue
                        : 0;

                    row.EndingInventoryEstimate = calculatedValue;

                    if (endingInvEstimateNum > 0) {
                      let lessThanVal = 0;
                      let greaterThanVal = 0;
                      const processOrderFormsSlice = processOrderForms.slice(
                        index + 1
                      );
                      let ctr = 0;
                      processOrderFormsSlice.some((value, index2) => {
                        ctr++;
                        // console.log("index2: ", index2);
                        const salesForecast =
                          !isNaN(value.Sales_Forecast) &&
                          isFinite(value.Sales_Forecast)
                            ? Math.round(value.Sales_Forecast)
                            : 0;

                        if (
                          lessThanVal < endingInvEstimateNum &&
                          lessThanVal + salesForecast < endingInvEstimateNum
                        ) {
                          lessThanVal += salesForecast;
                        }

                        if (greaterThanVal <= endingInvEstimateNum) {
                          greaterThanVal += salesForecast;
                        }

                        if (
                          greaterThanVal > endingInvEstimateNum ||
                          index2 === processOrderFormsSlice.length - 1
                        ) {
                          const lessThanEstimate =
                            endingInvEstimateNum - lessThanVal;
                          const greaterThanEstimate =
                            greaterThanVal - endingInvEstimateNum;

                          if (greaterThanEstimate < lessThanEstimate) {
                            endingInvWs = ctr;
                            console.log("if endingInvWs: ", endingInvWs);
                          } //minus one when lessThanEstimate is closest to the estimate number
                          else {
                            // endingInvWs = endingInvWs + 1;
                            endingInvWs = ctr - 1;
                            console.log("else endingInvWs: ", endingInvWs);
                          }

                          return true; // Stops the loop
                        }
                        return false;
                      });
                    } else {
                      // console.log("not entered");
                    }
                  } else {
                    suggestedOrder = 0;
                  }
                  return (
                    <TableRow
                      key={row.Week_No}
                      sx={{
                        "& td": { border: 0 },
                        ...(isDisabled && {
                          opacity: 0.5,
                          pointerEvents: "none",
                        }),
                      }}
                      style={{
                        backgroundColor: "",
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
                          onChange={(event) =>
                            handleChangeCheckBox(row.Week_No, event)
                          } // Update state on change
                          disabled={isDisabled} // Optionally disable checkbox if row is disabled
                          icon={<CheckBoxOutlineBlankIcon />} // Custom unchecked icon
                          checkedIcon={<CloseIcon sx={{ color: "red" }} />} // Custom checked icon ("X")
                        />
                      </StyledTableCellBody>
                      <StyledTableCellBody className="Week_No">
                        {row.Week_No}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {formatDate(row.Week_From)}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {formatDate(row.Week_To)}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {row.Original_PO_Eta}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {suggestedOrder}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {Number(row.Sales_Forecast) > 0 &&
                        !isNaN(row.Sales_Forecast) &&
                        isFinite(row.Sales_Forecast)
                          ? row.Sales_Forecast
                          : "-"}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        <StyledTableCellTextField
                          type="number"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            debouncedHAOnChange(row.Week_No, e)
                          } // Explicitly typing the event
                        />
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {SalesQuantitySold}
                      </StyledTableCellBody>
                      <StyledTableCellBody>
                        {isNaN(parseFloat(endingInvEstimate)) ||
                        parseFloat(endingInvEstimate) < 0
                          ? "-"
                          : endingInvEstimate}
                      </StyledTableCellBody>
                      <StyledTableCellBody
                        className={
                          row.Sales_On_Hand
                            ? "Sales_On_Hand"
                            : "Sales_On_Hand_Null"
                        }
                      >
                        {row.Sales_On_Hand}
                      </StyledTableCellBody>

                      <StyledTableCellBody
                        style={{
                          color:
                            endingInvWs < oderFormsDetails[0].BuildTo + 1
                              ? "red"
                              : "",
                        }}
                      >
                        {endingInvWs}
                      </StyledTableCellBody>
                    </TableRow>
                  );
                }
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
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

export default OrderForm;
