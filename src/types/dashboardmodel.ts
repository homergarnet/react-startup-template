export interface DashboardModel {
  Id: string;
  Checkbox: string;
  IsPOCheckbox: string;
  SkuNumber: string;
  ItemDescription: string;
  ContainerLoad: string;
  SkuCount: number;
  Moq: number;
  Trigger: number;
  BuildTo: number;
  UnitPerCase: number;
  InCase: number;
  InPallets: number;
  SuggestedWeekNo: string;
  SuggestedOrder: number;
  Adjustment: number;
  Ordered: string;
  CurrentWeekSupply: number;
  ProjectedWeekSupply: number;
  AdjustedOrder: number;
  AdjustedWeekSupply: number;
  IsEnabled: boolean;
  WorksheetStatus: number;
  DateTimeCreated: string;
  DateTimeUpdated: string;
  NextPoArrival: string;
  PoNumber: string;
  PoDay: string;
  VendorCode: string;
  VendorName: string;
  OriginalETA: string;
  UpdatedETA: string;
  CreatedOn: string; // Use 'Date' type if you're working with actual Date objects
  CreatedBy: string;
  ModifiedOn: string; // Use 'Date' type if you're working with actual Date objects
  ModifiedBy: string;
  ActionTblCol: string;
}

export interface UpdateWorksheetRequest {
  SkuNumber: string;
  WorksheetStatus: number;
}

export interface UpdateAdjustedRequest {
  SkuNumber: string;
  AdjustedOrder: number;
  AdjustedWeekSupply: number;
  WorksheetStatus: number;
}

export interface CreateOrUpdateIsPORequest {
  Id?: number;
  SkuNumber: string;
  IsWithPO: boolean;
  IsEnabled: boolean;
}

export interface WorksheetObj {
  SkuNumber: string;
  WorksheetStatus: number;
}
