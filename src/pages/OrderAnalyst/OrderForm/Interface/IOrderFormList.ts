import IPOStatuses from "./IPOStatuses";

export default interface IOrderFormList {
  isDisabled: boolean;
  isHighlight: boolean;
  isHighlightLY: boolean;
  isHighlightTY: boolean;
  Week_No: string;
  Week_From: string;
  Week_To: string;
  Original_PO_Eta: string;
  Latest_Expectation_Eta_PO: string;
  PO_Numbers: string;
  PO_Received_Week_No: string;
  Total_Quantity_Ordered: number;
  Latest_Expectation_Eta_Ordered: string;
  Latest_Expectation_Lapse_Time: string;
  Original_PO_Eta_Ordered: string;
  suggestedOrder: string;
  Sales_Forecast: string; // Changed from number to string
  Adjustment: number;
  SalesQuantitySold: number; // Changed from number to string
  endingInvEstimate: string;
  Sales_On_Hand: number;
  endingInvWs: string; // Changed from string to number
  POStatuses: IPOStatuses[] | null;
}
