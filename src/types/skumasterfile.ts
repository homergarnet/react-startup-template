export interface SkuMasterFileModel {
    id: string;
    skuNumber: string;
    itemDescription: string;
    vendorCode: string;
    vendorName: string;
    foreignVendorCode: string;
    foreignVendorName: string;
    countryOrigin: string;
    itemStatus: string;
    shelfLifeWeeks: number;
    trigger: number;
    buildTo: number;
    totalOrderLeadTime: number;
    cbmPerCase: number;
    totalCbmPerContainer: number;
    tonPerCase: number;
    poDay: string;
    buyer: string;
    unitPerCase: number;
    casePerPallet: number;
    unitPerPallet: number;
    totalTonPerContainer: number;
    noOfPalletsPerContainer: number;
    containerStacking: string;
    unitsPerContainer: number;
    containerLoad: string;
    containerSize: string;
    moq: number;
    mixLoadSkus: string;
    createdOn: string; // Use 'Date' type if you're working with actual Date objects
    createdBy: string;
    modifiedOn: string; // Use 'Date' type if you're working with actual Date objects
    modifiedBy: string;
    isEnabled: boolean;
}