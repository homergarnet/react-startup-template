import { INavLink } from "../Components/SideNav";
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

//Saved, Approval, Approved
export const WORKSHEET_STATUS = [2, 3, 4];

export const API_ENDPOINTS = {
  CREATE_SKU_MASTER_LIST: "SkuMasterList",
  GET_ALL_SKUS: "SkuMasterList/GetAllSkus",
  GET_SKU_DETAILS: "SkuMasterList/GetSkuDetails",
  GET_SKU_DETAILS_INQUIRY: "SkuMasterList/GetSkuDetailsInquiry",
  GET_WORKSHEET_DETAILS: "WorkSheet/GetWorkSheetDetails",
  GET_ALL_MIXED_SKUS_BY_SKU: "WorkSheet/get-all-mixed-skus-by-sku",
  GET_HOME_TBL_LIST: "Home/get-table-list",
  GET_TABLE_LIST_BY_SKU_NUMBER: "Home/get-table-list-by-sku-number",
  GET_WITH_PO_LIST: "Home/get-with-po-list",
  GET_HOME_MON_TO_FRI_COUNT: "Home/get-mon-to-fri-count",
  GET_SCORECARD_DETAILS_COUNT: "Home/scorecard-details-count",
  GET_ALL_BUYER: "SkuEnrollment/GetAllBuyer",
  GET_ALL_SKU_NUM: "SkuEnrollment/get-all-sku-num",
  IS_MIXED_LOAD_SKU: "SkuEnrollment/is-mixed-load-sku",
  GET_USER_BY_USERNAME: "User/GetUserByUsername",
  GET_DATE_MOD_ASA_DIM_CALENDAR_WORKSHEET:
    "User/get-date-mod-asa-dim-calendar-worksheet",
  GET_JOB_STATUS_RESULT: "Home/get-job-status-result",
  LOGIN: "User/login",
  BULK_INSERT: "SkuMasterList/upload",
  GET_WORKSHEET_PO_DETAILS: "WorkSheet/GetWorkSheetPODetails",
  GET_WORKSHEET_ACTUAL_RECEIVED_PER_SKU:
    "WorkSheet/get-worksheet-actual-received-per-sku",
  UPDATE_SKU: "SkuMasterList/UpdateSku",
  UPDATE_FOR_ORDERING_STATUS: "SkuMasterList/for-ordering-status",
  UPDATE_WORKSHEET_STATUS: "Home/update-worksheet-status",
  UPDATE_ADJUSTED_BY_SKU: "Home/update-adjusted-by-sku",
  CREATE_OR_UPDATE_IS_PO: "Home/create-is-po",
  DELETE_SKU: "SkuMasterList/DeleteSku",
  CREATE_WORKSHEET_DATA: "WorkSheet/CreateWorkSheetData",
  CREATE_USER: "User",
};

export const ROUTE_LOCATIONS = {
  HOME: "/order-analyst/home",
  SYSTEM_GENERATED: "/order-analyst/system-generated",
  TO_REVIEW_MANAGER_APPROVAL: "/order-analyst/manager-approval",
  APPROVED_S_AND_R: "/order-analyst/approved-s-and-r",
  MIX_CONTAINER_SUMMARY: "/order-analyst/mix-container-summary",
};

export const baselineLYTYHighlight = [
  {
    type: "baselineLY",
    colorType: "hex",
    color: "#115aaa",
  },
  {
    type: "baselineTY",
    colorType: "rgb",
    color: "rgb(27,54,100)",
  },
];

export const skuEnrollmentFields = [
  {
    name: "skuNumber",
    label: "SKU Number",
    type: "text",
    disabled: false,
    isNumberFormat: false,
  },
  {
    name: "itemDescription",
    label: "Item Description",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "vendorCode",
    label: "Vendor Code",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "vendorName",
    label: "Vendor Name",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "foreignVendorName",
    label: "Foreign Vendor Name",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "foreignVendorCode",
    label: "Foreign Vendor Code",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "countryOrigin",
    label: "Country Origin",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "itemStatus",
    label: "Item Status",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "buyer",
    label: "Buyer",
    type: "text",
    disabled: true,
    isNumberFormat: false,
  },
  {
    name: "shelfLifeWeeks",
    label: "Shelf Life Weeks",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "trigger",
    label: "Trigger",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "buildTo",
    label: "Build To",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "totalOrderLeadTime",
    label: "Total Order Lead Time",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "moq",
    label: "MOQ",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "poDay",
    label: "PO Day",
    type: "select",
    disabled: false,
    isNumberFormat: false,
  },
  {
    name: "cbmPerCase",
    label: "CBM Per Case",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "totalCbmPerContainer",
    label: "Total CBM Per Container",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "unitPerCase",
    label: "Unit Per Case",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "casePerPallet",
    label: "Case Per Pallet",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "tonPerCase",
    label: "Ton Per Case",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },

  // { name: "orderSpecialist", label: "Order Specialist", type: "autocomplete" },

  {
    name: "unitPerPallet",
    label: "Unit Per Pallet",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "unitsPerContainer",
    label: "Units Per Container",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "noOfPalletsPerContainer",
    label: "NO Of Pallets per Container",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "totalTonPerContainer",
    label: "Total Ton Per Container",
    type: "text",
    disabled: false,
    isNumberFormat: true,
  },
  {
    name: "containerStacking",
    label: "Container Stacking",
    type: "select",
    disabled: false,
    isNumberFormat: false,
  },
  {
    name: "containerLoad",
    label: "Container Load",
    type: "select",
    disabled: false,
    isNumberFormat: false,
  },
  {
    name: "containerSize",
    label: "Container Size",
    type: "select",
    disabled: false,
    isNumberFormat: false,
  },
  {
    name: "mixLoadSkus",
    label: "Mix Load Skus",
    type: "multiple autocomplete",
    disabled: false,
    isNumberFormat: false,
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
    role: [1, 2, 3],
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
    role: [1, 2, 3],
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
    role: [1, 2, 3],
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
    role: [1, 2, 3],
  },
  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Manager Ordering"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Manager Ordering",
    href: "/manager/manager-ordering",
    role: [1, 3],
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
  // {
  //   icon: (
  //     <img
  //       src={FoodPandaIcon}
  //       alt="Event"
  //       style={{ width: "30px", height: "30px" }}
  //     />
  //   ),
  //   label: "Event",
  //   href: "/order-analyst/mix-container-summary",
  //   role: [1, 2],
  // },
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
export const UPDATED_FOR_ORDERING_STATUS_MESSAGE =
  "For ordering updated successfully";
export const UPDATED_WORKSHEET_STATUS_MESSAGE =
  "Worksheet status updated successfully";
export const DELETED_SKU_MESSAGE = "SKU deleted successfully";

export const ADD_WORKSHEET_MESSAGE = "Inserted Successfully";
export const UPDATE_WORKSHEET_MESSAGE = "Updated Successfully";
export const ERR_UNEXPECTED_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again.";
export const DRAWER_WIDTH = 240;

export const CREATED_WITH_PO_MESSAGE = "Successfully created with po";

// for comparison constants
export const COMPARE_MIX_LOAD = "MIX LOAD";

export const BRANCH_DEPLOYED = "bugfix-p2/fix-hovering";
export const UNSAVE_CHANGES_MESSAGE =
  "You have unsaved changes. Do you really want to leave?";
// https://localhost:63266/homehub
// http://172.21.1.17:710/homehub
// https://bts-prod.snrph.com:710/homehub
export const HUB_CONNECTION = "https://localhost:63266/homehub";

export const HOME_ROOM_ID = "homeRoom";
