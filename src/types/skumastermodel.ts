export interface SkuMasterModel {
  Id: string;
  Checkbox?: string;
  SkuNumber: string;
  ItemDescription: string;
  VendorCode: string;
  VendorName: string;
  ForeignVendorCode: string;
  ForeignVendorName: string;
  CountryOrigin: string;
  ItemStatus: string;
  ShelfLifeWeeks: string;
  Trigger: number;
  BuildTo: number;
  TotalOrderLeadTime: number;
  CbmPerCase: number;
  TotalCbmPerContainer: number;
  TonPerCase: number;
  PoDay: string;
  Buyer: string;
  // OrderSpecialist: string;
  UnitPerCase: number;
  CasePerPallet: number;
  UnitPerPallet: number;
  TotalTonPerContainer: number;
  NoOfPalletsPerContainer: number;
  ContainerStacking: string;
  UnitsPerContainer: number;
  ContainerLoad: string;
  ContainerSize: string;
  Moq: number;
  IsMixLoadPrimarySku?: boolean;
  MixLoadSkus: string[];
  MixLoadSkusOld?: string[];
  CreatedOn: string; // Use 'Date' type if you're working with actual Date objects
  CreatedBy: string;
  ModifiedOn: string; // Use 'Date' type if you're working with actual Date objects
  ModifiedBy: string;
  IsEnabled: boolean;
  ForOrderingStatus?: number;
  ActionTblCol: string;
}
