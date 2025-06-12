import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash/debounce"; // Ensure lodash is installed: npm install lodash
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import IOrderForm from "../Interface/IOrderForm";
import IOrderFormList from "../Interface/IOrderFormList";
import { calculateEndingInventoryWeeks } from "../../../../utils/calclulateEndingInventoryWeeks";
import { compareWeekNumbers } from "../../../../utils/compareWeekNumbers";
import { incrementWeeks } from "../../../../utils/incrementWeeks";
import { formatDate } from "../../../../utils/formatDate";
import IOrderFormDetails from "../Interface/IOrderFormDetails";
import useHomeContext from "../../../../store/Home/useHomeContext";

const useUpdateOrderForm = () => {
  const {
    zIsFirstLoad,
    zIsOriginalClick,
    zWorksheetHistory,
    zSetBaseLineLastYear,
    zSetBaseLineThisYear,
    zBaseLineLastYear,
    zBaseLineThisYear,
    zSetSalesManualAdjustedWeeks,
    zSetSalesManualAdjustedValue,
    zCurrentWeekHighlight,
    zSetNextLeadTime,
    zSetOrderFormList,
    zCurrentWeek,
    zSetCurrentWeekSupply,
    zSetProjectedWeekSupply,
    zFirstSuggestedOrder,
    zSetFirstSuggestedOrder,
    zSetSuggestedWeekNo,
    zAdjustedOrder,
    zSetGreenCurrentWeekNo,
    zSetGreenCurrentWeekSupply,
  } = useOrderFormContext();

  const { zOrderFormReRender, zSetOrderFormReRender } = useHomeContext();

  const { zSkuMap, addOrUpdateUniqueSkuWithDebounce, removeSku, zSku } =
    useHomeContext();

  const [processOrderForms, setProcessOrderForms] = useState<IOrderForm[]>(
    [] as IOrderForm[]
  ); //Displayed Data
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [checkedItemsHistory, setCheckedItemsHistory] = useState<
    Record<string, boolean>
  >({});

  const [orderForms, setOrderForms] = useState<IOrderForm[]>(
    [] as IOrderForm[]
  ); //Initial & Original Data Load

  const [currentYearAndWeeks, setCurrentYearAndWeeks] = useState<string[]>([]);

  let currentYearAndWeek: string = "";

  const [previousYearAndWeeks, setPreviousYearAndWeeks] = useState<string[]>(
    []
  );

  const [orderFormsDetails, setOrderFormsDetails] = useState<
    IOrderFormDetails[]
  >([] as IOrderFormDetails[]);

  const [filteredTGA, setFilteredTGA] = useState<number>(0);
  const [adjustedOrder, setAdjustedOrder] = useState<number>(0);

  const isEnteredFirstSuggestedRef = useRef(true);

  useEffect(() => {
    currentYearAndWeek = zCurrentWeek;
    // console.log("useEffect currentYearAndWeek: ", currentYearAndWeek);
  }, [zCurrentWeek]);

  const processOrderFormAndSetState = (data: IOrderForm[]): void => {
    // console.log("Starting processOrderFormAndSetState");

    let orderFormList: IOrderFormList[] = []; // Initialize as an empty array
    let orderFormObj: IOrderFormList;
    let isAllowed: boolean = false;
    let isAllowedCtr: number = 0;
    let isHighlight: boolean = false;
    let prevWeekSalesOnHand: number = 0;
    let prevWeekEndingInventoryEstimate: number = 0;
    let actualReceivedPoTotal: number = 0;
    let latestExpectationEtaOrdered: number = 0;
    let totalQuantityOrdered: number = 0;
    let prevWeekEndInv: number = 0;
    let calculatedValue: number = 0;
    let endingInvEstimate: string = "";
    let endingInvEstimateNum: number = 0;
    let endingInvWs: number = 0;
    let suggestedOrder: number = 0;
    let salesManualAdjustedWeeks = "";
    let salesManualAdjustedValue = "";
    let isZeroTSalesQuotient = false;
    let isHighlightLY = false;
    let isHighlightTY = false;

    const pointWeekNo = zCurrentWeekHighlight?.split(".").map(Number) || [];
    const [yearPoint, weekPoint] = pointWeekNo;
    let incrementYearCurrWeekHighlight = yearPoint + 1 + "." + weekPoint;
    let currWeekHighlight = yearPoint + "." + weekPoint;
    console.log(
      "incrementYearCurrWeekHighlight: ",
      incrementYearCurrWeekHighlight
    );
    //for setting up the growth, TGA, and forecast
    data.map((item, index) => {
      console.log("index: ", index);
      console.log("WeekNo: ", item.Week_No);

      const pointA = currentYearAndWeeks[0]?.split(".").map(Number) || [];
      const pointB = currentYearAndWeeks[1]?.split(".").map(Number) || [];
      const pointC = previousYearAndWeeks[1]?.split(".").map(Number) || [];
      const [rowYear, rowWeek] = item.Week_No?.split(".").map(Number) || [];
      const [yearA, weekA] = pointA;
      const [yearB, weekB] = pointB;
      const [yearC, weekC] = pointC;

      const zBaseLineLYFormatted =
        yearB - rowYear === 1 && zIsOriginalClick === false
          ? zBaseLineLastYear
          : 0;

      const zBaseLineTYFormatted =
        yearB === rowYear && zIsOriginalClick === false ? zBaseLineThisYear : 0;
      // console.log("rowYear: ", rowYear);
      // console.log("rowWeek: ", rowWeek);
      // console.log("yearA: ", yearA);
      // console.log("weekA: ", weekA);
      // console.log("yearB: ", yearB);
      // console.log("weekB: ", weekB);
      // console.log("yearC: ", yearC);
      // console.log("weekC: ", weekC);
      // console.log("zBaseLineTYFormatted: ", zBaseLineTYFormatted);

      const adjustment = item.Adjustment != null ? item.Adjustment : 0;
      // console.log("adjustment: ", adjustment);
      if (adjustment != null && adjustment !== 0) {
        salesManualAdjustedWeeks =
          salesManualAdjustedWeeks + item.Week_No + ",";
        salesManualAdjustedValue =
          salesManualAdjustedValue + adjustment.toString() + ",";
      }

      let lastYearSalesVal = 0;

      // always get the Last Year Sales Value
      if (rowYear < yearB) {
        lastYearSalesVal = item.LY_Sales_Quantity_Sold;
      }

      // get the Last Year Sales Value
      if (rowYear === yearB) {
        lastYearSalesVal =
          item.LY_Sales_Quantity_Sold > zBaseLineLastYear
            ? item.LY_Sales_Quantity_Sold
            : zBaseLineLastYear;
      }

      // get the Current Year Sales Value
      if (rowYear > yearB) {
        lastYearSalesVal =
          item.LY_Sales_Quantity_Sold > zBaseLineThisYear
            ? item.LY_Sales_Quantity_Sold
            : item.Week_No < incrementYearCurrWeekHighlight
            ? zBaseLineThisYear
            : item.LY_Sales_Quantity_Sold;
      }

      const LastYearSales = lastYearSalesVal;

      const thisYearStart = Math.max(0, index - 12 + 1);
      const thisYearEnd = index;

      const thisYearRange = data
        .slice(thisYearStart, thisYearEnd + 1)
        .filter((order) => order.Is_Checked === false);
      // console.log("thisYearStart: ", thisYearStart);
      // console.log("thisYearRange: ", thisYearRange);
      let growthList = thisYearRange.map((item2) => {
        const [rowYear, rowWeek] = item2.Week_No?.split(".").map(Number) || [];

        // Range check
        const ThisYearWithinRange =
          (rowYear > yearA || (rowYear === yearA && rowWeek >= weekA)) &&
          (rowYear < yearB || (rowYear === yearB && rowWeek <= weekB));
        const isDisabled = !ThisYearWithinRange;

        // Determine if we should apply the replacement logic
        const thisYearBaseLine =
          rowYear === yearB && rowWeek >= 1 && rowWeek <= weekB;

        const lastYearBaseLine =
          rowYear === yearC && rowWeek >= 1 && rowWeek <= weekC;

        let lySalesQuantitySoldVal = 0;

        // always get the LY_Sales_Quantity_Sold Value
        if (rowYear < yearB) {
          lySalesQuantitySoldVal = item2.LY_Sales_Quantity_Sold;
        }

        // get the LY_Sales_Quantity_Sold Value
        if (rowYear === yearB) {
          lySalesQuantitySoldVal =
            item2.LY_Sales_Quantity_Sold > zBaseLineLastYear
              ? item2.LY_Sales_Quantity_Sold
              : zBaseLineLastYear;
        }

        // get the LY_Sales_Quantity_Sold Value
        if (rowYear > yearB) {
          lySalesQuantitySoldVal =
            item2.LY_Sales_Quantity_Sold > zBaseLineTYFormatted
              ? item2.LY_Sales_Quantity_Sold
              : item2.Week_No < incrementYearCurrWeekHighlight
              ? zBaseLineTYFormatted
              : item2.LY_Sales_Quantity_Sold;
        }

        const lySalesQuantitySold = lySalesQuantitySoldVal;
        // console.log("lySalesQuantitySold: ", lySalesQuantitySold);
        // console.log("zBaseLineLastYear: ", zBaseLineLastYear);

        const tySalesQuantitySold =
          item2.Sales_Quantity_Sold > zBaseLineTYFormatted
            ? item2.Sales_Quantity_Sold
            : item2.Week_No < zCurrentWeekHighlight
            ? zBaseLineTYFormatted
            : item2.Sales_Quantity_Sold;
        // console.log("item2 WeekNo: ", item2.Week_No);
        // console.log("lySalesQuantitySold: ", lySalesQuantitySold);
        // console.log("tySalesQuantitySold: ", tySalesQuantitySold);
        //for checking only
        if (item2.Week_No === "2024.43") {
          // console.log("Entered date: ", item2.Week_No);
          // console.log("lySalesQuantitySold: ", lySalesQuantitySold);
          // console.log("tySalesQuantitySold: ", tySalesQuantitySold);
          if (lySalesQuantitySold !== 0) {
            // console.log(
            //   "lySalesQuantitySold !== 0: ",
            //   ((tySalesQuantitySold - lySalesQuantitySold) /
            //     lySalesQuantitySold) *
            //     100
            // );
          }
        }

        // Calculate growth
        return lySalesQuantitySold !== 0
          ? ((tySalesQuantitySold - lySalesQuantitySold) /
              lySalesQuantitySold) *
              100
          : 0;
      });
      // console.log("growthList: ", growthList);

      item.Growth =
        growthList.length > 0 && growthList[growthList.length - 1] != null
          ? growthList[growthList.length - 1]
          : 0;
      const growthSum = growthList.reduce((acc, item) => acc + item, 0);

      // console.log("growthSum: ", growthSum);

      // const growthSum = growthList.reduce((acc, item) => {
      //   console.log("Accumulator:", acc, "Current Item:", item);
      //   return acc + item;
      // }, 0);

      const thisYearTga = growthSum / growthList.length;
      const thisYearTgaFormatted = Number.isNaN(thisYearTga) ? 0 : thisYearTga;
      // console.log("thisYearTga: ", thisYearTga);
      // console.log("thisYearTgaFormatted: ", thisYearTgaFormatted);
      // console.log("growthSum: ", growthSum);

      item.TrendGrowthAverage = thisYearTgaFormatted;
      //validated ang first condition pero yung second hindi pa
      const sForecast =
        item.Week_No < currentYearAndWeeks[1]
          ? LastYearSales * (1 + thisYearTgaFormatted / 100) + adjustment
          : LastYearSales * (1 + filteredTGA / 100) + adjustment;

      item.Sales_Forecast = sForecast;
    });

    zSetSalesManualAdjustedWeeks(salesManualAdjustedWeeks);
    zSetSalesManualAdjustedValue(salesManualAdjustedValue);

    // Process the data
    const processedData = data.map((item, index) => {
      // console.log("index: ", index);
      // console.log("WeekNo: ", item.Week_No);

      const adjustment = item.Adjustment != null ? item.Adjustment : 0;

      const pointA = currentYearAndWeeks[0]?.split(".").map(Number) || [];
      const pointB = currentYearAndWeeks[1]?.split(".").map(Number) || [];
      const pointC = previousYearAndWeeks[1]?.split(".").map(Number) || [];
      const [yearA, weekA] = pointA;
      const [yearB, weekB] = pointB;
      const [yearC, weekC] = pointC;
      const [rowYear, rowWeek] = item.Week_No?.split(".").map(Number) || [];
      // console.log("yearA: ", yearA);
      // console.log("weekA: ", weekA);
      // console.log("yearB: ", yearB);
      // console.log("weekB: ", weekB);
      // console.log("yearC: ", yearC);
      // console.log("weekC: ", weekC);
      // console.log("rowYear: ", rowYear);
      // console.log("rowWeek: ", rowWeek);
      const zBaseLineLYFormatted =
        yearB - rowYear === 1 && zIsOriginalClick === false
          ? zBaseLineLastYear
          : 0;

      const zBaseLineTYFormatted =
        yearB === rowYear && zIsOriginalClick === false ? zBaseLineThisYear : 0;
      // Range check
      const ThisYearWithinRange =
        (rowYear > yearA || (rowYear === yearA && rowWeek >= weekA)) &&
        (rowYear < yearB || (rowYear === yearB && rowWeek <= weekB));
      const isDisabled = !ThisYearWithinRange;

      // Determine if we should apply the replacement logic
      const thisYearBaseLine =
        rowYear === yearB && rowWeek >= 1 && rowWeek <= weekB;

      const lastYearBaseLine =
        rowYear === yearC && rowWeek >= 1 && rowWeek <= weekC;

      const tySalesQuantitySold =
        item.Sales_Quantity_Sold > zBaseLineTYFormatted
          ? item.Sales_Quantity_Sold
          : item.Week_No < zCurrentWeekHighlight
          ? zBaseLineTYFormatted
          : item.Sales_Quantity_Sold;
      // console.log("tySalesQuantitySold: ", tySalesQuantitySold);
      const weekNoY = item.Week_No?.split(".").map(Number) || [];
      const [weekNoYear, weekNum] = weekNoY;

      // console.log("yearB <= rowYear: ", Number(yearB) <= Number(rowYear));
      //for displaying Sales > Actual
      // why we need to display the Sales_Quantity_Sold always
      const SalesQuantitySold =
        yearB - rowYear === 1
          ? item.Sales_Quantity_Sold > zBaseLineLastYear
            ? item.Sales_Quantity_Sold
            : zBaseLineLastYear
          : tySalesQuantitySold;

      // console.log("SalesQuantitySold: ", SalesQuantitySold);

      isHighlightLY =
        yearB - rowYear === 1 &&
        zBaseLineLastYear > 0 &&
        zBaseLineLastYear > item.Sales_Quantity_Sold
          ? true
          : false;

      isHighlightTY =
        yearB - rowYear === 0 &&
        zBaseLineTYFormatted > 0 &&
        item.Week_No < zCurrentWeekHighlight &&
        zBaseLineTYFormatted > item.Sales_Quantity_Sold
          ? true
          : false;
      // const currentYearWeekNo =
      //   yearB.toString() + "." + weekB < 9
      //     ? "0" + weekB.toString()
      //     : weekB.toString();

      prevWeekSalesOnHand =
        index != 0 && data[index - 1].Sales_On_Hand != null
          ? Number.isNaN(data[index - 1].Sales_On_Hand)
            ? 0
            : data[index - 1].Sales_On_Hand
          : 0;

      // console.log("prevWeekSalesOnHand: ", prevWeekSalesOnHand);

      prevWeekEndingInventoryEstimate =
        index != 0 && data[index - 1].EndingInventoryEstimate != null
          ? Number.isNaN(data[index - 1].EndingInventoryEstimate)
            ? 0
            : data[index - 1].EndingInventoryEstimate
          : 0;

      actualReceivedPoTotal =
        item.Actual_Received_PO_Total == null ||
        Number.isNaN(item.Actual_Received_PO_Total) ||
        !isFinite(item.Actual_Received_PO_Total)
          ? 0
          : item.Actual_Received_PO_Total;

      suggestedOrder = 0;

      latestExpectationEtaOrdered =
        item.Latest_Expectation_Eta_Ordered == null ||
        Number.isNaN(item.Latest_Expectation_Eta_Ordered) ||
        !isFinite(item.Latest_Expectation_Eta_Ordered)
          ? 0
          : item.Latest_Expectation_Eta_Ordered;

      // console.log("latestExpectationEtaOrdered: ", latestExpectationEtaOrdered);

      totalQuantityOrdered =
        item.Total_Quantity_Ordered == null ||
        Number.isNaN(item.Total_Quantity_Ordered) ||
        !isFinite(item.Total_Quantity_Ordered)
          ? 0
          : item.Total_Quantity_Ordered;

      // console.log("totalQuantityOrdered: ", totalQuantityOrdered);

      // console.log("totalQuantityOrdered: ", totalQuantityOrdered);
      //get the prevWeekEndingInventoryEstimate when prevWeekSalesOnHand is 0
      prevWeekEndInv =
        prevWeekSalesOnHand === 0 && prevWeekEndingInventoryEstimate > 0
          ? prevWeekEndingInventoryEstimate
          : prevWeekSalesOnHand;

      //set this to zero when estimate is less than zero
      calculatedValue =
        prevWeekEndInv -
          item.Sales_Forecast +
          suggestedOrder +
          (item.Week_No >= zCurrentWeekHighlight
            ? item.Total_Quantity_Ordered
            : 0) <
        0
          ? 0
          : prevWeekEndInv -
            item.Sales_Forecast +
            suggestedOrder +
            (item.Week_No >= zCurrentWeekHighlight
              ? item.Total_Quantity_Ordered
              : 0);

      // console.log("prevWeekEndInv: ", prevWeekEndInv);
      // console.log("item.Sales_Forecast: ", item.Sales_Forecast);
      // console.log("suggestedOrder: ", suggestedOrder);
      // console.log("item.Total_Quantity_Ordered: ", item.Total_Quantity_Ordered);
      // console.log("outside calculatedValue: ", calculatedValue);
      // Determine display value
      endingInvEstimate = calculatedValue.toFixed(2);
      // console.log("outside endingInvEstimate: ", endingInvEstimate);

      endingInvEstimateNum =
        !isNaN(calculatedValue) && isFinite(calculatedValue)
          ? calculatedValue
          : 0;
      item.EndingInventoryEstimate = endingInvEstimateNum;

      // console.log("outside endingInvEstimateNum: ", endingInvEstimateNum);

      endingInvWs = calculateEndingInventoryWeeks(
        endingInvEstimateNum,
        data,
        index
      );
      if (item.Week_No === currWeekHighlight) {
        zSetGreenCurrentWeekNo(item.Week_No);
        zSetGreenCurrentWeekSupply(endingInvWs);
      }
      // console.log("outside endingInvWs: ", endingInvWs);
      // if (item.Week_No >= "2025.20") {
      //   console.log("item.Week_No: ", item.Week_No);
      //   console.log("currentYearAndWeek: ", currentYearAndWeek);
      //   console.log(
      //     "compareWeekNumbers: ",
      //     compareWeekNumbers(item.Week_No, currentYearAndWeek)
      //   );
      // }
      //to prevent the first compareWeekNumbers highlight
      if (
        item.Week_No >= currentYearAndWeeks[1] &&
        isAllowedCtr < 2 &&
        compareWeekNumbers(item.Week_No, currentYearAndWeek)
      ) {
        // console.log("pumasok dito");
        isAllowed = true;
        isAllowedCtr += 1;

        if (isAllowedCtr === 1) {
          const incrementedValue = incrementWeeks(
            item.Week_No,
            orderFormsDetails[0].TotalOrderLeadTime - 1
          ); // Derive the next value
          currentYearAndWeek = incrementedValue;
          // console.log("currentYearAndWeek1: ", currentYearAndWeek);
        }
      }

      if (
        item.Week_No >= currentYearAndWeeks[1] &&
        isAllowed &&
        //if you want to highlight the next weeks when true, make the condition isAllowedCtr >= 2
        isAllowedCtr == 2 &&
        compareWeekNumbers(item.Week_No, currentYearAndWeek)
      ) {
        //remove this code if you want to highlight the next weeks
        isAllowedCtr += 1;
        isHighlight = true;

        zSetNextLeadTime(
          item.Week_No +
            " " +
            formatDate(item.Week_From) +
            " to " +
            formatDate(item.Week_To)
        );
        // console.log("entered index: ", index);
        const incrementedValue = incrementWeeks(
          item.Week_No,
          orderFormsDetails[0].TotalOrderLeadTime - 1
        ); // Derive the next value
        currentYearAndWeek = incrementedValue;
        // console.log("currentYearAndWeek2: ", currentYearAndWeek);
      } else {
        isHighlight = false;
      }

      // console.log("endingInvEstimateNum: ", endingInvEstimateNum);
      // console.log("endingInvWs: ", endingInvWs);

      if (
        isAllowed &&
        isAllowedCtr >= 2 &&
        endingInvWs <= orderFormsDetails[0].Trigger
      ) {
        // console.log("equals");
        let skipper =
          orderFormsDetails[0].BuildTo - endingInvWs + endingInvWs + 1;
        // console.log("skipper: ", skipper);
        const processOrderFormsSlice = data.slice(
          index + endingInvWs + 1,
          index + skipper
        );

        // console.log("processOrderFormsSlice: ", processOrderFormsSlice);
        // console.log("index: ", index);
        // console.log("endingInvWs: ", endingInvWs);

        const totalSalesForecast = processOrderFormsSlice.reduce(
          (total, item) => {
            return total + (item.Sales_Forecast || 0); // Add Sales_Forecast if it exists, otherwise add 0
          },
          0
        );

        // console.log("totalSalesForecast: ", totalSalesForecast);

        // console.log("totalSalesForecast: ", totalSalesForecast);
        const tsForecastQuotient = Math.ceil(
          totalSalesForecast / orderFormsDetails[0].Moq
        );

        // console.log("tsForecastQuotient: ", tsForecastQuotient);

        isZeroTSalesQuotient =
          totalSalesForecast === 0 && tsForecastQuotient === 0;
        // if suggestedOrder is not needed to override
        // suggestedOrder =
        //   isEnteredFirstSuggestedRef.current === true && adjustedOrder != 0
        //     ? adjustedOrder
        //     : !isNaN(orderFormsDetails[0].Moq * tsForecastQuotient)
        //     ? orderFormsDetails[0].Moq * tsForecastQuotient
        //     : 0;
        // console.log("orderFormsDetails[0].Moq: ", orderFormsDetails[0].Moq);
        // console.log("tsForecastQuotient: ", tsForecastQuotient);
        // console.log("suggestedOrder: ", suggestedOrder);
        // if zAdjustedOrder is needed to override
        if (item.Week_No === "2025.39")
          console.log("zAdjustedOrder: ", zAdjustedOrder);
        suggestedOrder =
          isHighlight === true && zAdjustedOrder !== 0
            ? zAdjustedOrder
            : isHighlight === true &&
              !isNaN(orderFormsDetails[0].Moq * tsForecastQuotient) &&
              zAdjustedOrder === 0
            ? orderFormsDetails[0].Moq * tsForecastQuotient
            : isHighlight === false &&
              !isNaN(orderFormsDetails[0].Moq * tsForecastQuotient)
            ? orderFormsDetails[0].Moq * tsForecastQuotient
            : 0;

        //set this to zero when estimate is less than zero
        calculatedValue =
          prevWeekEndInv -
            item.Sales_Forecast +
            suggestedOrder +
            (item.Week_No >= zCurrentWeekHighlight
              ? item.Total_Quantity_Ordered
              : 0) <
          0
            ? 0
            : prevWeekEndInv -
              item.Sales_Forecast +
              suggestedOrder +
              (item.Week_No >= zCurrentWeekHighlight
                ? item.Total_Quantity_Ordered
                : 0);

        // console.log("inside prevWeekEndInv: ", prevWeekEndInv);
        // console.log("inside item.Sales_Forecast: ", item.Sales_Forecast);
        // console.log("inside suggestedOrder: ", suggestedOrder);
        // console.log(
        //   "inside item.Total_Quantity_Ordered: ",
        //   item.Total_Quantity_Ordered
        // );
        // console.log("inside calculatedValue: ", calculatedValue);

        endingInvEstimate = calculatedValue.toFixed(2);

        // console.log("inside endingInvEstimate: ", endingInvEstimate);

        endingInvEstimateNum =
          !isNaN(calculatedValue) && isFinite(calculatedValue)
            ? calculatedValue
            : 0;
        item.EndingInventoryEstimate = endingInvEstimateNum;

        // console.log("inside endingInvEstimateNum: ", endingInvEstimateNum);

        // console.log("endingInvEstimateNum: ", endingInvEstimateNum);
        if (isEnteredFirstSuggestedRef.current === true) {
          // console.log("first suggested week no:", item.Week_No);
          // console.log("suggestedOrder:", suggestedOrder);

          // to replicate
          //get the first suggested week no isHighlight is yellow
          if (suggestedOrder > 0 && isHighlight) {
            // console.log("suggested: ", suggestedOrder);
            zSetSuggestedWeekNo(item.Week_No);
          }

          zSetFirstSuggestedOrder(suggestedOrder);

          zSetCurrentWeekSupply(endingInvWs);
          // console.log("inside endingInvWs currentWeekSupply: ", endingInvWs);
          // console.log("endingInvWs without suggested: ", endingInvWs);
        }
        endingInvWs = calculateEndingInventoryWeeks(
          endingInvEstimateNum,
          data,
          index
        );

        // console.log("inside endingInvWs: ", endingInvWs);

        if (isEnteredFirstSuggestedRef.current === true) {
          zSetProjectedWeekSupply(endingInvWs);
          zSetOrderFormReRender(zOrderFormReRender + 1);
          addOrUpdateUniqueSkuWithDebounce(zSku, endingInvWs, zAdjustedOrder);
          isEnteredFirstSuggestedRef.current = false;
        }

        // console.log("endingInvWs inside: ", endingInvWs);
      } else {
        suggestedOrder = 0;
      }

      let originalPOEtaOrderedF =
        !isNaN(item.Original_PO_Eta_Ordered) &&
        isFinite(item.Original_PO_Eta_Ordered) &&
        item.Original_PO_Eta_Ordered;

      let latestExpectationEtaOrderedF =
        !isNaN(item.Latest_Expectation_Eta_Ordered) &&
        isFinite(item.Latest_Expectation_Eta_Ordered) &&
        item.Latest_Expectation_Eta_Ordered;

      let totalQuantityOrderedF =
        !isNaN(item.Total_Quantity_Ordered) &&
        isFinite(item.Total_Quantity_Ordered) &&
        item.Total_Quantity_Ordered;

      let suggestedOrderLF =
        !isNaN(suggestedOrder) &&
        isFinite(suggestedOrder) &&
        suggestedOrder.toLocaleString();

      let salesForecastF =
        !isNaN(item.Sales_Forecast) &&
        isFinite(item.Sales_Forecast) &&
        item.Sales_Forecast.toFixed(2);

      orderFormObj = {
        isDisabled: isDisabled, //done
        isHighlight: isHighlight, // done
        isHighlightLY: isHighlightLY, // inprogress
        isHighlightTY: isHighlightTY, // inprogress
        Week_No: item.Week_No, // done
        Week_From: item.Week_From, // done
        Week_To: item.Week_To, // done
        Latest_Expectation_Eta_PO: item.Latest_Expectation_Eta_PO, // done
        PO_Numbers: item.PO_Numbers, // done
        PO_Received_Week_No: item.PO_Received_Week_No, // done
        Total_Quantity_Ordered: item.Total_Quantity_Ordered, // done
        Original_PO_Eta: item.Original_PO_Eta, // done
        Latest_Expectation_Eta_Ordered: latestExpectationEtaOrderedF.toString(), // done
        Latest_Expectation_Lapse_Time: item.Latest_Expectation_Lapse_Time, // done
        Original_PO_Eta_Ordered: originalPOEtaOrderedF.toString(), // done
        suggestedOrder: suggestedOrderLF.toString(), // done
        Sales_Forecast: salesForecastF ? salesForecastF : "", // done
        Adjustment: adjustment, // dones
        SalesQuantitySold: SalesQuantitySold, // done
        endingInvEstimate: endingInvEstimateNum.toFixed(2), // done endingInvEstimateNum, // done
        Sales_On_Hand: item.Sales_On_Hand, // done
        //for non X
        // endingInvWs: endingInvWs.toString(), // done
        endingInvWs: endingInvWs.toString(), // done
        POStatuses: item.POStatuses, // done
      };
      orderFormList.push(orderFormObj);
      return {
        ...item,
        // TrendGrowthAverage: Growth,
        // EndingInventoryEstimate: endingInventoryEstimate,
      };
    });
    // Update the state with the processed data and set processing complete flag
    setProcessOrderForms(processedData);
    calculateAverageGrowth();
    // console.log("orderFormList: ", orderFormList);
    zSetOrderFormList(orderFormList);
    // console.log("called ito");
    // console.log("zBaseLineLastYear: ", zBaseLineLastYear);
    // console.log("zBaseLineThisYear: ", zBaseLineThisYear);
  };

  const calculateAverageGrowth = () => {
    if (!currentYearAndWeeks || currentYearAndWeeks.length < 2) {
      setFilteredTGA(0.0);
      return;
    }
    const [startRange, endRange] = currentYearAndWeeks;
    if (!startRange || !endRange) {
      setFilteredTGA(0.0);
      return;
    }

    const unckeckedItemsProcess =
      zIsOriginalClick === true
        ? orderForms.filter(
            (item) =>
              item.Week_No >= startRange &&
              item.Week_No <= endRange &&
              !item.Is_Checked
          )
        : processOrderForms.filter(
            (item) =>
              item.Week_No >= startRange &&
              item.Week_No <= endRange &&
              !item.Is_Checked
          );
    // console.log("startRange: ", startRange);
    // console.log("endRange: ", endRange);
    // console.log("unckeckedItemsProcess: ", unckeckedItemsProcess);
    // console.log("zIsOriginalClick: ", zIsOriginalClick);
    // console.log("orderForms: ", orderForms);
    // console.log("processOrderForms: ", processOrderForms);
    if (unckeckedItemsProcess.length === 0) {
      setFilteredTGA(0.0);
      return;
    }

    // Calculate total growth and average growth
    const totalGrowth = unckeckedItemsProcess.reduce(
      (sum, item) => sum + item.Growth,
      0
    );
    // console.log("totalGrowth: ", totalGrowth);
    const averageGrowth = totalGrowth / unckeckedItemsProcess.length;

    // console.log("totalGrowth: ", totalGrowth);
    // console.log("averageGrowth: ", averageGrowth);
    // console.log("averageGrowth: ", averageGrowth);
    setFilteredTGA(averageGrowth);
  };

  const updateOrderForm = () => {
    isEnteredFirstSuggestedRef.current = true;

    // console.log("zWorksheetHistory: ", zWorksheetHistory);
    if (
      zWorksheetHistory &&
      zWorksheetHistory[0] &&
      zWorksheetHistory[0].BaseLineLY &&
      zIsFirstLoad
    ) {
      zSetBaseLineLastYear(
        zIsOriginalClick === false ? zWorksheetHistory[0].BaseLineLY : 0
      );
    }
    if (
      zWorksheetHistory &&
      zWorksheetHistory[0] &&
      zWorksheetHistory[0].BaseLineTY &&
      zIsFirstLoad
    ) {
      zSetBaseLineThisYear(
        zIsOriginalClick === false ? zWorksheetHistory[0].BaseLineTY : 0
      );
    }

    let exTgaArr =
      zWorksheetHistory &&
      zWorksheetHistory[0]?.ExTGAWeekNo &&
      zWorksheetHistory[0]?.ExTGAWeekNo.split(",");
    // console.log("exTgaArr: ", exTgaArr);
    // console.log("checkedItems only: ", checkedItems);

    if (exTgaArr && zIsOriginalClick === false) {
      // Filter the array to remove items marked as false in checkedItems
      exTgaArr = exTgaArr.filter(
        (weekNo) => !(weekNo in checkedItems && !checkedItems[weekNo])
      );

      // console.log("Filtered exTgaArr: ", exTgaArr);

      const newCheckedItems = exTgaArr.reduce((acc, weekNo) => {
        acc[weekNo] = true; // Set each weekNo as checked (true)
        return acc;
      }, {} as Record<string, boolean>);

      setCheckedItemsHistory(newCheckedItems);
    } else {
      setCheckedItemsHistory({});
    }

    let salesMAWeeksArr =
      zWorksheetHistory &&
      zWorksheetHistory[0]?.SalesManualAdjustedWeeks &&
      zIsFirstLoad &&
      zWorksheetHistory[0]?.SalesManualAdjustedWeeks.split(",");

    let salesMAValueArr =
      zWorksheetHistory &&
      zWorksheetHistory[0]?.SalesManualAdjustedValue &&
      zIsFirstLoad &&
      zWorksheetHistory[0]?.SalesManualAdjustedValue?.split(",");

    // console.log("exTgaArr: ", exTgaArr);
    // console.log("salesMAWeeksArr: ", salesMAWeeksArr);
    // console.log("salesMAValueArr: ", salesMAValueArr);
    let pdCtr = 0;
    let processedData = processOrderForms.map((item, index) => {
      //for extga
      if (
        zIsFirstLoad &&
        exTgaArr &&
        exTgaArr.includes(item.Week_No) &&
        zIsOriginalClick === false
      ) {
        item.Is_Checked = true;
      } else {
        // console.log(`Week_No ${item.Week_No} is not in exTgaArr`);
      }

      if (
        zIsFirstLoad &&
        salesMAWeeksArr &&
        salesMAWeeksArr.includes(item.Week_No) &&
        zIsOriginalClick === false
      ) {
        item.Adjustment =
          salesMAValueArr && salesMAValueArr[pdCtr] != null
            ? parseInt(salesMAValueArr[pdCtr])
            : 0;
        pdCtr++;
      } else {
        // console.log(`Week_No ${item.Week_No} is not in exTgaArr`);
      }

      return item; // Return the modified item
    });

    // console.log("processedData: ", processedData);

    const orderFormList =
      processOrderForms.length === 0 || zIsOriginalClick === true
        ? orderForms
        : processedData;
    processOrderFormAndSetState(orderFormList);
    // console.log("processOrderForms.length: ", processOrderForms.length);
    // console.log("zIsOriginalClick: ", zIsOriginalClick);
    // console.log("orderForms: ", orderForms);
    // console.log("orderFormList: ", orderFormList);
  };

  return {
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
    adjustedOrder,
    setAdjustedOrder,
  };
};

export default useUpdateOrderForm;
