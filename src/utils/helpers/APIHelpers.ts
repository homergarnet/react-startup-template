import axios, { AxiosResponse } from "axios";
// import { SkuMasterModel } from "../../types/skumastermodel";
import { API_ENDPOINTS } from "../../constants/constants";
import { apiConfig } from "../../config/apiconfig";
// import { WorksheetDataModel } from "../../types/worksheetData";
// import IUserSignup from "../../Pages/_Auth/Interface/IUserSignup";
import { Login } from "../../types/usermodel";
// Define types for function parameters
export const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

// export const CREATESKUMASTERLIST = async (
//     data: SkuMasterModel,
//     antiForgeryToken?: string
// ): Promise<AxiosResponse | undefined> => {
//     try {
//         const res = await apiConfig.post(`${API_BASE_URL}/${API_ENDPOINTS.CREATE_SKU_MASTER_LIST}`, data);
//         return res;
//     } catch (error: any) {
//         return error.response;
//     }
// };

export const GETALLSKUS = async (
    roleId: string,
    userEmailAdd: string,
    antiForgeryToken?: string,

): Promise<AxiosResponse | void> => {
    try {
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_ALL_SKUS}?roleId=${roleId}&userEmailAdd=${userEmailAdd}`);
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
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_SKU_DETAILS}?skuNumber=${skuNumber}&roleId=${roleId}&userEmailAdd=${userEmailAdd}`);
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
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_SKU_DETAILS_INQUIRY}?skuNumber=${skuNumber}&userEmailAdd=${userEmailAdd}`);
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
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_WORKSHEET_DETAILS}?Sku=${skuNumber}&userEmailAdd=${userEmailAdd}`);
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
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_USER_BY_USERNAME}?userName=${username}`);
        return res;
    } catch (error: any) {
        console.error("Error: " + error.response);
    }
};

export const LOGIN = async (
    data: Login,
): Promise<AxiosResponse | undefined> => {
    try {
        const res = await apiConfig.post(`${API_BASE_URL}/${API_ENDPOINTS.LOGIN}`, data);
        return res;
    } catch (error: any) {
        return error.response;
    }
};

export const GETWORKSHEETPODETAILS = async (
    // antiForgeryToken?: string,
    // bearerToken?: string
    poNumber: string
): Promise<AxiosResponse | void> => {

    try {
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_WORKSHEET_PO_DETAILS}?poNumber=${poNumber}`);
        return res;
    } catch (error: any) {
        console.error("Error: " + error.response);
    }
};

// export const UPDATESKU = async (
//     data: SkuMasterModel,
// ): Promise<AxiosResponse | undefined> => {
//     try {
//         const res = await apiConfig.put(`${API_BASE_URL}/${API_ENDPOINTS.UPDATE_SKU}`, data);
//         return res;
//     } catch (error: any) {
//         return error.response;
//     }
// };

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

// export const CREATEWORKSHEETDATA = async (
//     data: WorksheetDataModel,
//     antiForgeryToken?: string
// ): Promise<AxiosResponse | undefined> => {
//     try {
//         const res = await apiConfig.post(`${API_BASE_URL}/${API_ENDPOINTS.CREATE_WORKSHEET_DATA}`, data);
//         return res;
//     } catch (error: any) {
//         return error.response;
//     }
// };

// export const CREATEUSER = async (
//     data: IUserSignup,
//     antiForgeryToken?: string
// ): Promise<AxiosResponse | undefined> => {
//     try {
//         const res = await apiConfig.post(`${API_BASE_URL}/${API_ENDPOINTS.CREATE_USER}`, data);
//         return res;
//     } catch (error: any) {
//         return error.response;
//     }
// };

export const GETALLBUYER = async (
    // antiForgeryToken?: string,
    // bearerToken?: string
    // skuNumber: string
): Promise<AxiosResponse | void> => {

    try {
        const res = await apiConfig.get(`${API_BASE_URL}/${API_ENDPOINTS.GET_ALL_BUYER}`);
        return res;
    } catch (error: any) {
        console.error("Error: " + error.response);
    }

};