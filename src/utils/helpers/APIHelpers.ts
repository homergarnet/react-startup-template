import axios, { AxiosResponse } from "axios";
import { SkuMasterModel } from "../../types/skumastermodel";
import { API_ENDPOINTS } from "../../constants/constants";
import { apiConfig } from "../../Config/apiconfig";
// Define types for function parameters
export const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

export const CREATESKUMASTERLIST = async (
    data: SkuMasterModel,
    antiForgeryToken?: string
): Promise<AxiosResponse | undefined> => {
    try {
        const res = await apiConfig.post(`${API_BASE_URL}/${API_ENDPOINTS.CREATE_SKU_MASTER_LIST}`, data);
        return res;
    } catch (error: any) {
        return error.response;
    }
};

export const GETALLSKUS = async (
    antiForgeryToken?: string
): Promise<AxiosResponse | void> => {
    try {
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_ALL_SKUS}`);
        return res;
    } catch (error: any) {
        console.error("Error: " + error.response);
    }
};

export const GETSKUDETAILS = async (
    // antiForgeryToken?: string,
    // bearerToken?: string
    skuNumber: string
): Promise<AxiosResponse | void> => {

    try {
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_SKU_DETAILS}?skuNumber=${skuNumber}`);
        return res;
    } catch (error: any) {
        console.error("Error: " + error.response);
    }
};

export const UPDATESKU = async (
    data: SkuMasterModel,
): Promise<AxiosResponse | undefined> => {
    try {
        const res = await apiConfig.put(`${API_BASE_URL}/${API_ENDPOINTS.UPDATE_SKU}`, data);
        return res;
    } catch (error: any) {
        return error.response;
    }
};

export const DELETESKU = async (
    id: any,

): Promise<AxiosResponse | undefined> => {
    try {
        const res = await apiConfig.delete(`${API_BASE_URL}/${API_ENDPOINTS.DELETE_SKU}/${id}`);
        return res;
    } catch (error: any) {
        return error.response;
    }
};