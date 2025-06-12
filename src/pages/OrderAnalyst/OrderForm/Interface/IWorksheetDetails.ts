export default interface IWorksheetSkuDetails {
    Id: string;
    SkuNumber: string;
    ItemDescription: string;
    VendorCode: string;
    VendorName: string;
    ForeignVendorCode: string;
    ForeignVendorName: string;
    CountryOrigin: string;
    ItemStatus: string;
    ShelfLifeWeeks: number;
    Trigger: number;
    BuildTo: number;
    TotalOrderLeadTime: number;
    CbmPerCase: number;
    TotalCbmPerContainer: number;
    TonPerCase: number;
    PoDay: string;
    Buyer: string;
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
    MixLoadSkus: string | null;
    CreatedOn: string; // ISO Date string
    CreatedBy: string;
    ModifiedOn: string; // ISO Date string
    ModifiedBy: string;
    IsEnabled: boolean | null;
}

export interface IWorksheetList {
    Week_No: string;
    Week_From: string; // ISO Date string
    Week_To: string;   // ISO Date string
    SkuNumber: string | null;
    Original_PO_Eta: string | null; // ISO Date string
    Original_PO_Eta_Ordered: number;
    Sales_Forecast: number;
    Sales_Adjusted: number;
    Latest_Expectation_Eta_PO: string | null; // ISO Date string
    Latest_Expectation_Eta_Ordered: number;
    Latest_Expectation_Lapse_Time: string | null; // ISO Date string
    Actual_Received_PO: string | null; // ISO Date string
    Actual_Received_PO_Total: number;
    Sales_Quantity_Sold: number;
    LY_Sales_Quantity_Sold: number;
    Growth: number;
    TrendGrowthAverage: number;
    Sales_On_Hand: number;
    Prev_Sales_On_Hand: number | null;
    Is_Checked: boolean;
}

export interface IWorksheetHistory {
    SkuNumber: string;
    ExTGAWeekNo: string; // Comma-separated week numbers
    BaseLineTY: number;
    BaseLineLY: number;
    SalesManualAdjustedWeeks: string | null; // Nullable, assuming string format
    SalesManualAdjustedValue: number | null;
    WorkSheetStatus: number;
    WorkSheetUser: string;
    CreatedOn: string; // ISO Date string
    ModifiedOn: string; // ISO Date string
}

export interface ITGA {
    Week_No: string;
    SkuNumber: string | null;
    Growth: number;
    isChecked: boolean;
}

export interface IWorksheetDetailsState {
    //     SkuMasterLists: SkuMasterModel[],
    SyncDate: string;
    selectedTGA: number;
    currentRange: string[];
    previousRange: string[];
    workSheetSkuDetails: IWorksheetSkuDetails[];
    workSheetList: IWorksheetList[];
    workSheetHistory: IWorksheetHistory[];
    tga: ITGA[];
}
