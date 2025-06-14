export interface WorkSheetPODModel {
  SKU_Number: number;
  PO_Number: number;
  Quantity_Ordered: number;
  Quantity_Received: number;
  Quantity_Remaining_To_Received: number;
  Received_Status_Percentage_Display: string;
  Received_Status_Percentage: string;
  Received_Status: string;
  Receipt_Date: string;
  IsPartialReceived_PO: number;
  IsPartialReceived_SKU: string;
  DateInserted: string;
  Description: string;
  BUY_UM: string;
  SELL_UM: string;
  Original_Order: number;
  On_Order: number;
  Vendor: string | null;
  GSheet_Revised_ETA: string;
  MMS_Expected_Receipt_Date: string;
  GSheet_Status: string;
  Lapse_Time: number;
  PO_Status: string;
  Extended_Retail: number;
  Extended_Cost: number;
}
