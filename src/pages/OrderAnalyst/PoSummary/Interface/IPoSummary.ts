export default interface IPoSummary {
  SkuNumber: string;
  Description: string;  // Changed from number to string
  BuyUM: number;
  SellUM: number;    // Changed from string to number
  OriginalOrder: string;  // Changed from number to string
  OnOrder: number;
  ExtendRetail: string;
  ExtendCost: string;
}
