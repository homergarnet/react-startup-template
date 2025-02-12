export default interface IOrderForm {
  Adjustment: number;
  Actual_Received_PO: string;
  Actual_Received_PO_Total: number;
  Growth: number;
  Is_Checked: boolean;
  Latest_Expectation_Eta_Ordered: number;
  Latest_Expectation_Eta_PO: string;  // Changed from number to string
  Latest_Expectation_Lapse_Time: string;
  Original_PO_Eta: string;  // Changed from number to string
  Original_PO_Eta_Ordered: number;
  Prev_Sales_On_Hand: number;
  Sales_Forecast: number;    // Changed from string to number
  Sales_On_Hand: number;
  Sales_Quantity_Sold: number;
  TrendGrowthAverage: number;
  Week_From: string;
  Week_No: string;
  Week_To: string;
  LY_Sales_Quantity_Sold: number;
  SuggestedOrder: number;
  EndingInventoryEstimate: number;
  EndingInventoryWeekSupply: number;
}
