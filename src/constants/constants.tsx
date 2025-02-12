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

export const employeeFields = [
  {
    name: "employeeNumber",
    label: "Employee Number",
    type: "text",
    disabled: false,
  },
  {
    name: "fullName",
    label: "Fullname",
    type: "text",
    disabled: false,
  },
  {
    name: "designation",
    label: "Designation",
    type: "select",
    disabled: false,
  },
  { name: "agency", label: "Agency", type: "select", disabled: false },
  {
    name: "teamAssignment",
    label: "Team Assignment",
    type: "select",
    disabled: false,
  },
];

export const teamFields = [
  {
    name: "teamName",
    label: "Team Name",
    type: "text",
    fieldTypes: ["", ""],
    disabled: false,
  },
  {
    name: "colorCode",
    label: "Color Code",
    type: "colorCode",
    fieldTypes: ["", ""],
    disabled: false,
  },
  {
    name: "area",
    label: "Area",
    type: "select",
    fieldTypes: ["", ""],
    disabled: false,
  },
  {
    name: "shift",
    label: "Shift",
    type: "select",
    fieldTypes: ["", ""],
    disabled: false,
  },
  {
    name: "restDay",
    label: "Rest Day",
    type: "buttonGroup",
    fieldTypes: ["", ""],
    disabled: false,
  },
  {
    name: "shiftPerRole",
    label: "Shift Per Role",
    type: "labelWithText",
    fieldTypes: ["text", "text"],
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
    href: "/home",
    role: [1, 2],
  },
  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Enrollment - People"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Enrollment - People",
    href: "/enrollment-people",
    role: [1, 2],
  },
  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Team Masterlist"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Team Masterlist",
    href: "/team-masterlist",
    role: [1, 2],
  },

  {
    icon: (
      <img
        src={FoodPandaIcon}
        alt="Employee Masterlist"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Employee Masterlist",
    href: "/employee-masterlist",
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
        alt="Agency"
        style={{ width: "30px", height: "30px" }}
      />
    ),
    label: "Agency",
    href: "/agency",
    role: [1, 2],
  },
];

export const ADD_EMPLOYEE = "Add Employee";
export const UPDATE_EMPLOYEE = "Update Employee";
export const DELETE_EMPLOYEE = "Delete Employee";
export const UPDATED_SKU_MESSAGE = "SKU updated successfully";
export const DELETED_SKU_MESSAGE = "SKU deleted successfully";

export const ADD_WORKSHEET_MESSAGE = "Inserted Successfully";
export const UPDATE_WORKSHEET_MESSAGE = "Updated Successfully";

export const DRAWER_WIDTH = 240;
