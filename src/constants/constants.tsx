import FoodPandaIcon from "../assets/FoodPandaSideNav.png";

export interface INavLink {
  icon: JSX.Element;
  label: string;
  href: string;
  role: number[];
}

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
  GET_SKU_DETAILS_INQUIRY: "SkuMasterList/GetSkuDetailsInquiry",
  GET_WORKSHEET_DETAILS: "WorkSheet/GetWorkSheetDetails",
  GET_ALL_BUYER: "SkuEnrollment/GetAllBuyer",
  GET_USER_BY_USERNAME: "User/GetUserByUsername",
  LOGIN: "User/login",
  GET_WORKSHEET_PO_DETAILS: "WorkSheet/GetWorkSheetPODetails",
  UPDATE_SKU: "SkuMasterList/UpdateSku",
  DELETE_SKU: "SkuMasterList/DeleteSku",
  CREATE_WORKSHEET_DATA: "WorkSheet/CreateWorkSheetData",
  CREATE_USER: "User",
};

export const skuEnrollmentFields = [
  { name: "skuNumber", label: "SKU Number", type: "text", disabled: false },
  {
    name: "itemDescription",
    label: "Item Description",
    type: "text",
    disabled: true,
  },
  { name: "vendorCode", label: "Vendor Code", type: "text", disabled: true },
  { name: "vendorName", label: "Vendor Name", type: "text", disabled: true },
  {
    name: "foreignVendorName",
    label: "Foreign Vendor Name",
    type: "text",
    disabled: true,
  },
  {
    name: "foreignVendorCode",
    label: "Foreign Vendor Code",
    type: "text",
    disabled: true,
  },
  {
    name: "countryOrigin",
    label: "Country Origin",
    type: "text",
    disabled: true,
  },
  { name: "itemStatus", label: "Item Status", type: "text", disabled: true },
  {
    name: "shelfLifeWeeks",
    label: "Shelf Life Weeks",
    type: "number",
    disabled: false,
  },
  { name: "trigger", label: "Trigger", type: "number", disabled: false },
  { name: "buildTo", label: "Build To", type: "number", disabled: false },
  {
    name: "totalOrderLeadTime",
    label: "Total Order Lead Time",
    type: "number",
    disabled: false,
  },
  {
    name: "cbmPerCase",
    label: "CBM Per Case",
    type: "number",
    disabled: false,
  },
  {
    name: "totalCbmPerContainer",
    label: "Total CBM Per Container",
    type: "number",
    disabled: false,
  },
  {
    name: "tonPerCase",
    label: "Ton Per Case",
    type: "number",
    disabled: false,
  },
  { name: "poDay", label: "Po Day", type: "select", disabled: false },
  { name: "buyer", label: "Buyer", type: "autocomplete", disabled: false },
  // { name: "orderSpecialist", label: "Order Specialist", type: "autocomplete" },
  {
    name: "unitPerCase",
    label: "Unit Per Case",
    type: "number",
    disabled: false,
  },
  {
    name: "casePerPallet",
    label: "Case Per Pallet",
    type: "number",
    disabled: false,
  },
  {
    name: "unitPerPallet",
    label: "Unit Per Pallet",
    type: "number",
    disabled: false,
  },
  {
    name: "totalTonPerContainer",
    label: "Total Ton Per Container",
    type: "number",
    disabled: false,
  },
  {
    name: "noOfPalletsPerContainer",
    label: "No Of Pallets per Container",
    type: "number",
    disabled: false,
  },
  {
    name: "containerStacking",
    label: "Container Stacking",
    type: "select",
    disabled: false,
  },
  {
    name: "unitsPerContainer",
    label: "Units Per Container",
    type: "number",
    disabled: false,
  },
  {
    name: "containerLoad",
    label: "Container Load",
    type: "select",
    disabled: false,
  },
  {
    name: "containerSize",
    label: "Container Size",
    type: "text",
    disabled: false,
  },
  { name: "moq", label: "MOQ", type: "number", disabled: false },
  {
    name: "mixLoadSkus",
    label: "Mix Load Skus",
    type: "text",
    disabled: false,
  },
];

export const skuNavLinks: INavLink[] = [
  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Home"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Home",
    href: "/order-analyst/home",
    role: [1, 2],
  },
  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Sku Enrollment"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "SKU Enrollment",
    href: "/order-analyst/sku-enrollment",
    role: [1, 2],
  },

  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="SKU Master List"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "SKU Master List",
    href: "/order-analyst/sku-masterlist",
    role: [1, 2],
  },

  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Order Form"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Order Form",
    href: "/order-analyst/order-form",
    role: [1, 2],
  },

  // {
  //   icon: (
  //     <img
  //       src={FoodPandaIcon}
  //       alt="Reports"
  //       style={{ width: "30px", height: "30px" }}
  //     />
  //   ),
  //   label: "Reports",
  //   href: "/order-analyst/reports",
  // },
  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Mix Container Summary"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Mix Container Summary",
    href: "/order-analyst/mix-container-summary",
    role: [1, 2],
  },
  // {
  //   icon: (
  //     <img
  //       src={FoodPandaIcon}
  //       alt="With Gatepass"
  //       style={{ width: "30px", height: "30px" }}
  //     />
  //   ),
  //   label: "PO Summary",
  //   href: "/order-analyst/po-summary",
  // },
  // {
  //   icon: (
  //     <img
  //       src={FoodPandaIcon}
  //       alt="With Gatepass"
  //       style={{ width: "30px", height: "30px" }}
  //     />
  //   ),
  //   label: "Simulation Only",
  //   href: "/order-analyst/simulation-only",
  //   role: [1,2],
  // },
  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="With Gatepass"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Signup",
    href: "/signup",
    role: [1],
  },
];

export const ADD_SKU = "Add SKU";
export const UPDATE_SKU = "Update SKU";
export const DELETE_SKU = "Delete SKU";
export const UPDATED_SKU_MESSAGE = "SKU updated successfully";
export const DELETED_SKU_MESSAGE = "SKU deleted successfully";

export const ADD_WORKSHEET_MESSAGE = "Inserted Successfully";
export const UPDATE_WORKSHEET_MESSAGE = "Updated Successfully";

export const DRAWER_WIDTH = 240;
