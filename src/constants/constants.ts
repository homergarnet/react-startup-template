export interface INavLink {
  icon: JSX.Element;
  label: string;
  href: string;
}
import FoodPandaIcon from "../Assets/FoodPandaSideNav.png";
export const BLACK_LIST_CHARACTERS = ["~", "<", ">", "\\", "'", "`", '"'];
export const BASIC_PUNCTUATIONS = ["(", ")", ".", ",", "-", '"', "'"];
export const WHITE_SPACE = [" "];

export const PUNCTUATIONS = [
  "[",
  "]",
  "{",
  "}",
  "|",
  "\\",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ">",
  ".",
  "/",
  "?",
  "`",
  "~",
  "Dead",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "=",
  "+",
  "*",
  "-",
];

export const API_ENDPOINTS = {
  CREATE_SKU_MASTER_LIST: "SkuMasterList",
  GET_ALL_SKUS: "SkuMasterList/GetAllSkus",
  GET_SKU_DETAILS: "SkuMasterList/GetSkuDetails",
  GET_WORKSHEET_PO_DETAILS: "WorkSheet/GetWorkSheetPODetails",
  UPDATE_SKU: "SkuMasterList/UpdateSku",
  DELETE_SKU: "SkuMasterList/DeleteSku",
};

export const skuEnrollmentFields = [
  { name: "skuNumber", label: "SKU Number", type: "text" },
  { name: "itemDescription", label: "Item Description", type: "text" },
  { name: "vendorCode", label: "Vendor Code", type: "text" },
  { name: "vendorName", label: "Vendor Name", type: "text" },
  { name: "foreignVendorName", label: "Foreign Vendor Name", type: "text" },
  { name: "foreignVendorCode", label: "Foreign Vendor Code", type: "text" },
  { name: "countryOrigin", label: "Country Origin", type: "text" },
  { name: "itemStatus", label: "Item Status", type: "text" },
  { name: "shelfLifeWeeks", label: "Shelf Life Weeks", type: "number" },
  { name: "trigger", label: "Trigger", type: "number" },
  { name: "buildTo", label: "Build To", type: "number" },
  {
    name: "totalOrderLeadTime",
    label: "Total Order Lead Time",
    type: "number",
  },
  { name: "cbmPerCase", label: "CBM Per Case", type: "number" },
  {
    name: "totalCbmPerContainer",
    label: "Total CBM Per Container",
    type: "number",
  },
  { name: "tonPerCase", label: "Ton Per Case", type: "number" },
  { name: "poDay", label: "Po Day", type: "select" },
  { name: "buyer", label: "Buyer", type: "text" },
  // { name: "orderSpecialist", label: "Order Specialist", type: "autocomplete" },
  { name: "unitPerCase", label: "Unit Per Case", type: "number" },
  { name: "casePerPallet", label: "Case Per Pallet", type: "number" },
  { name: "unitPerPallet", label: "Unit Per Pallet", type: "number" },
  {
    name: "totalTonPerContainer",
    label: "Total Ton Per Container",
    type: "number",
  },
  {
    name: "noOfPalletsPerContainer",
    label: "No Of Pallets per Container",
    type: "number",
  },
  { name: "containerStacking", label: "Container Stacking", type: "text" },
  { name: "unitsPerContainer", label: "Units Per Container", type: "number" },
  { name: "containerLoad", label: "Container Load", type: "text" },
  { name: "containerSize", label: "Container Size", type: "text" },
  { name: "moq", label: "MOQ", type: "number" },
  { name: "mixLoadSkus", label: "Mix Load Skus", type: "text" },
];



export const ADD_SKU = "Add SKU";
export const UPDATE_SKU = "Update SKU";
export const DELETE_SKU = "Delete SKU";
export const UPDATED_SKU_MESSAGE = "SKU updated successfully";
export const DELETED_SKU_MESSAGE = "SKU deleted successfully";
