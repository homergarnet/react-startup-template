import { apiConfig } from "@/config/apiConfig";
import { API_ENDPOINTS } from "@/constants/constants";
import type { SkuMasterModel } from "@/types/skumastermodel";
import type { AxiosResponse, CancelToken } from "axios";

export const API_BASE_URL = import.meta.env.VITE_APP_API_ENDPOINT;

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
