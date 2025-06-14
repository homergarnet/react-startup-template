import axios, { AxiosResponse, CancelToken } from "axios";
import {
  SkuMasterModel,
  UpdateWorksheetfileOrderingRequest,
} from "../../types/skumastermodel";
import { API_ENDPOINTS } from "../../constants/constants";
import { apiConfig } from "../../Config/apiconfig";
import { WorksheetDataModel } from "../../types/worksheetDataModel";
import IUserSignup from "../../Pages/_Auth/Interface/IUserSignup";
import { Login } from "../../types/usermodel";
import {
  CreateOrUpdateIsPORequest,
  UpdateAdjustedRequest,
  UpdateWorksheetRequest,
} from "../../types/dashboardmodel";
// Define types for function parameters
export const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

export const CREATESKUMASTERLIST = async (
  data: SkuMasterModel,
  antiForgeryToken?: string
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.post(
      `${API_BASE_URL}/${API_ENDPOINTS.CREATE_SKU_MASTER_LIST}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const GETALLSKUS = async (
  roleId: string,
  userEmailAdd: string,
  forOrderingStatus?: number,
  cancelToken?: CancelToken,
  antiForgeryToken?: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_ALL_SKUS}?roleId=${roleId}&userEmailAdd=${userEmailAdd}&forOrderingStatus=${forOrderingStatus}`,
      { cancelToken }
    );
    return res;
  } catch (error: any) {
    console.error(
      "GETALLSKUS error:",
      error?.response?.data || error.message || error
    );
    console.error("Error: " + error.response);
  }
};

export const GETSKUDETAILS = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  skuNumber: string,
  roleId: string,
  userEmailAdd: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_SKU_DETAILS}?skuNumber=${skuNumber}&roleId=${roleId}&userEmailAdd=${userEmailAdd}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETSKUDETAILSINQUIRY = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  skuNumber: string,
  userEmailAdd: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_SKU_DETAILS_INQUIRY}?skuNumber=${skuNumber}&userEmailAdd=${userEmailAdd}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETWORKSHEETDETAILS = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  skuNumber: string,
  userEmailAdd: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_WORKSHEET_DETAILS}?Sku=${skuNumber}&userEmailAdd=${userEmailAdd}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETALLMIXEDSKUSBYSKU = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  skuNumber: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_ALL_MIXED_SKUS_BY_SKU}?skuNumber=${skuNumber}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETHOMETBLLIST = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  keyword: string,
  wsStatus: number,
  page: number,
  pageSize: number
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_HOME_TBL_LIST}?keyword=${keyword}&wsStatus=${wsStatus}&page=${page}&pageSize=${pageSize}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETTABLELISTBYSKUNUMBER = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  keyword: string,
  wsStatus: number,
  skuNumbers: string,
  skip: number,
  take: number
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_TABLE_LIST_BY_SKU_NUMBER}?keyword=${keyword}&wsStatus=${wsStatus}&skuNumbers=${skuNumbers}&skip=${skip}&take=${take}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETWITHPOLIST = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  keyword: string,
  page: number,
  pageSize: number
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_WITH_PO_LIST}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETMONTOFRICOUNT = async (): // antiForgeryToken?: string,
// bearerToken?: string

Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_HOME_MON_TO_FRI_COUNT}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETSCORECARDDETAILSCOUNT = async (): // antiForgeryToken?: string,
// bearerToken?: string

Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_SCORECARD_DETAILS_COUNT}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETUSERBYUSERNAME = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  username: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_USER_BY_USERNAME}?userName=${username}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETDATEMODASADIMCALENDARWORKSHEET =
  async (): // antiForgeryToken?: string,
  // bearerToken?: string

  Promise<AxiosResponse | void> => {
    try {
      const res = await apiConfig.get(
        `${API_BASE_URL}/${API_ENDPOINTS.GET_DATE_MOD_ASA_DIM_CALENDAR_WORKSHEET}`
      );
      return res;
    } catch (error: any) {
      console.error("Error: " + error.response);
    }
  };

export const GETJOBSTATUSRESULT = async (): // antiForgeryToken?: string,
// bearerToken?: string

Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_JOB_STATUS_RESULT}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const LOGIN = async (
  data: Login
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.post(
      `${API_BASE_URL}/${API_ENDPOINTS.LOGIN}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const GETWORKSHEETPODETAILS = async (
  // antiForgeryToken?: string,
  // bearerToken?: string

  poNumber: string,
  skuNumber?: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_WORKSHEET_PO_DETAILS}?skuNumber=${skuNumber}&poNumber=${poNumber}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETWORKSHEETACTUALRECEIVEDPERSKU = async (
  // antiForgeryToken?: string,
  // bearerToken?: string
  skuNumber: string,
  poNumber: string
): Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_WORKSHEET_ACTUAL_RECEIVED_PER_SKU}?skuNumber=${skuNumber}&poNumber=${poNumber}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const UPDATESKU = async (
  data: SkuMasterModel
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.put(
      `${API_BASE_URL}/${API_ENDPOINTS.UPDATE_SKU}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const UPDATEFORORDERINGSTATUS = async (
  data: UpdateWorksheetfileOrderingRequest
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.put(
      `${API_BASE_URL}/${API_ENDPOINTS.UPDATE_FOR_ORDERING_STATUS}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const UPDATEWORKSHEETSTATUS = async (
  data: UpdateWorksheetRequest
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.put(
      `${API_BASE_URL}/${API_ENDPOINTS.UPDATE_WORKSHEET_STATUS}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const UPDATEADJUSTEDBYSKU = async (
  data: UpdateAdjustedRequest
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.put(
      `${API_BASE_URL}/${API_ENDPOINTS.UPDATE_ADJUSTED_BY_SKU}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const CREATEORUPDATEPOISPO = async (
  data: CreateOrUpdateIsPORequest
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.post(
      `${API_BASE_URL}/${API_ENDPOINTS.CREATE_OR_UPDATE_IS_PO}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const DELETESKU = async (
  id: any,
  skuNumber: string
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.delete(
      `${API_BASE_URL}/${API_ENDPOINTS.DELETE_SKU}/${id}/${skuNumber}`
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const CREATEWORKSHEETDATA = async (
  data: WorksheetDataModel,
  antiForgeryToken?: string
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.post(
      `${API_BASE_URL}/${API_ENDPOINTS.CREATE_WORKSHEET_DATA}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const CREATEUSER = async (
  data: IUserSignup,
  antiForgeryToken?: string
): Promise<AxiosResponse | undefined> => {
  try {
    const res = await apiConfig.post(
      `${API_BASE_URL}/${API_ENDPOINTS.CREATE_USER}`,
      data
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const GETALLBUYER = async (): // antiForgeryToken?: string,
// bearerToken?: string
// skuNumber: string
Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_ALL_BUYER}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const GETALLSKUNUM = async (
  skuNumber: string
): // antiForgeryToken?: string,
// bearerToken?: string
// skuNumber: string
Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.GET_ALL_SKU_NUM}?skuNumber=${skuNumber}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const ISMIXEDLOADSKU = async (
  skuNumber: string
): // antiForgeryToken?: string,
// bearerToken?: string
// skuNumber: string
Promise<AxiosResponse | void> => {
  try {
    const res = await apiConfig.get(
      `${API_BASE_URL}/${API_ENDPOINTS.IS_MIXED_LOAD_SKU}?skuNumber=${skuNumber}`
    );
    return res;
  } catch (error: any) {
    console.error("Error: " + error.response);
  }
};

export const BIMASTERLIST = async (
  file: File
): Promise<AxiosResponse | undefined> => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Ensure backend expects "file"

    const res = await apiConfig.post(
      `${API_BASE_URL}/${API_ENDPOINTS.BULK_INSERT}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
