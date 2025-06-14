import IOrderForm from "../Pages/OrderAnalyst/OrderForm/Interface/IOrderForm";
interface ProcessOrderForm {
  Sales_Forecast: number;
}

export const calculateEndingInventoryWeeks = (
  endingInvEstimateNum: number,
  data: IOrderForm[],
  index: number
): number => {
  // console.log("calculateEndingInventoryWeeks index: ", index);

  let endingInvWs = 0;

  if (endingInvEstimateNum > 0) {
    // console.log("data[index].Week_No: ", data[index].Week_No);
    let lessThanVal = 0;
    let greaterThanVal = 0;
    const processOrderFormsSlice = data.slice(index + 1);
    let salesForecastArr: number[] = [];

    let ctr = 0;
    // console.log("processOrderFormsSlice: ", processOrderFormsSlice)
    processOrderFormsSlice.some((item, index2) => {
      ctr++;
      // console.log("index2: ", index2)
      salesForecastArr.push(item.Sales_Forecast);
      if (
        lessThanVal < endingInvEstimateNum &&
        lessThanVal + item.Sales_Forecast < endingInvEstimateNum
      ) {
        lessThanVal += item.Sales_Forecast;
        // console.log("lessThanVal pumasok: ", lessThanVal);
      }

      if (greaterThanVal <= endingInvEstimateNum) {
        greaterThanVal += item.Sales_Forecast;
      }
      // if (data[index].Week_No === "2026.13") {
      //   console.log("greaterThanVal: ", greaterThanVal);
      // }
      if (
        greaterThanVal > endingInvEstimateNum ||
        ctr === processOrderFormsSlice.length
      ) {
        // if processOrderFormsSlice.length last loop and still the endingInvEstimateNum is
        // greater than greaterThanVal make it to zero
        // set endingInvWs to -1 so the tbl list will see as X
        if (
          ctr === processOrderFormsSlice.length &&
          endingInvEstimateNum > greaterThanVal
        ) {
          // console.log(
          //   "ctr === processOrderFormsSlice.length: ",
          //   ctr === processOrderFormsSlice.length
          // );
          endingInvWs = -1;
          return true;
        }
        const lessThanEstimate = endingInvEstimateNum - lessThanVal;
        const greaterThanEstimate = greaterThanVal - endingInvEstimateNum;

        if (greaterThanEstimate < lessThanEstimate) {
          endingInvWs = ctr;

          // console.log("greaterThanEstimate: ", endingInvWs);
        } else {
          endingInvWs = ctr - 1;
          //uncomment this code if we dont want to wait to the ending inventory week supply
          // if (salesForecastArr[index2 - 1] === 0) {
          //   // Find all indices where values are greater than zero
          //   let indices = salesForecastArr
          //     .map((value, index) => (value > 0 ? index : -1))
          //     .filter((index) => index !== -1);

          //   // Get the second-to-last index if it exists
          //   let secondToLastIndex =
          //     indices.length > 1 ? indices[indices.length - 2] : 0; // change it to negative -1 if needed
          //   endingInvWs = secondToLastIndex + 1;
          // }

          if (endingInvWs === 0) {
            endingInvWs = 1;
          }
          // console.log("lessThanEstimate: ", endingInvWs);
        }

        return true; // Stops the loop
      }

      return false;
    });

    // console.log("salesForecastArr: ", salesForecastArr);
  }

  return endingInvWs;
};
