export default interface IOrderForm {
  Week_No: string;
  Week_From: string;
  Week_To: string;
  SkuNumber: string;
  Original_PO_Eta: string;  // Changed from number to string
  Original_PO_Eta_Ordered: number;
  Sales_Forecast: number;    // Changed from string to number
  Latest_Expectation_Eta_PO: string;  // Changed from number to string
  Latest_Expectation_Eta_Ordered: number;
  Latest_Expectation_Lapse_Time: string;
  Actual_Received_PO: string;
  Actual_Received_PO_Total: number;
  Sales_Quantity_Sold: number;
  LY_Sales_Quantity_Sold: number;
  Growth: number;
  Sales_On_Hand: number;
}
