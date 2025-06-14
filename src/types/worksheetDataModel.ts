export interface WorksheetDataModel {
  SkuNumber: string;
  ExTGAWeekNo: string;
  BaseLineTY: number;
  BaseLineLY: number;
  SalesManualAdjustedWeeks: string;
  SalesManualAdjustedValue: string;
  WorkSheetStatus: number;
  WorkSheetUser: string;
  GreenCurrentWeekNo?: string;
  GreenCurrentWeekSupply?: number;
  CurrentWeekSupply: number;
  ProjectedWeekSupply: number;
  SuggestedWeekNo: string;
  SuggestedOrder: number;
  AdjustedOrder?: number;
  CreatedOn: string;
  ModifiedOn: string;
}
