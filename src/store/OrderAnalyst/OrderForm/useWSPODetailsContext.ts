// src/store.ts
import create from "zustand";
import { AxiosError } from "axios";
import { SkuMasterModel } from "../../../types/skumastermodel";
import * as APIHelpers from "../../../utils/helpers/APIHelpers";
import useSharedStore from "../../sharedStore";
import { WorkSheetPODModel } from "../../../types/workSheetPODetails";
import { ERR_UNEXPECTED_ERROR_MESSAGE } from "../../../constants/constants";
import useOrderFormContext from "./useOrderFormContext";

//for definining of types
interface WorkSheetPODetailsState {
  zWSPODList: WorkSheetPODModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetWSPODList: (zWSPODList: WorkSheetPODModel[]) => Promise<void>;
  zWSPODetailsSearchText: string;
  zSetWSPODetailsSearchText: (zWSPODetailsSearchText: string) => void;
  zOriginalPOEtaCache: string;
  zSetOriginalPOEtaCache: (zOriginalPOEtaCache: string) => void;
  zLoadingPODetails: boolean;
  zSetLoadingPODetails: (zLoadingPODetails: boolean) => void;
  getWorkSheetPODetails: (
    poNumber: string,
    isDisableLoading?: boolean
  ) => Promise<void>;
  getWorkSheetActualReceivedPerSku: (
    skuNumber: string,
    poNumber: string,
    isDisableLoading?: boolean
  ) => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useWSPODetailsContext = create<WorkSheetPODetailsState>((set) => ({
  zWSPODList: null,
  zSetWSPODList: async (zWSPODList: WorkSheetPODModel[]) => set({ zWSPODList }),
  zWSPODetailsSearchText: "",
  zSetWSPODetailsSearchText: (zWSPODetailsSearchText: string) =>
    set({ zWSPODetailsSearchText }),
  zOriginalPOEtaCache: "",
  zSetOriginalPOEtaCache: (zOriginalPOEtaCache: string) =>
    set({ zOriginalPOEtaCache }),
  zLoadingPODetails: false,
  zSetLoadingPODetails: (zLoadingPODetails: boolean) =>
    set({ zLoadingPODetails }),
  getWorkSheetPODetails: async (poNumber: string, isDisableLoading = false) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    const { zSetVendorName } = useOrderFormContext.getState();
    const { zSetLoadingPODetails } = useWSPODetailsContext.getState();
    if (!isDisableLoading) {
      zSetLoading(true);
    } else if (isDisableLoading) {
      zSetLoadingPODetails(true);
    }

    try {
      const response = await APIHelpers.GETWORKSHEETPODETAILS(poNumber, "");

      set({
        zWSPODList: response?.data,
      });

      zSetVendorName(response?.data[0].Vendor);

      zSetLoading(false);
      if (isDisableLoading) {
        zSetLoadingPODetails(false);
      }
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(
          `Error fetching getWorkSheetActualReceivedPerSku: ${error.message}`
        );
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
      return Error;
    }
  },
  getWorkSheetActualReceivedPerSku: async (
    skuNumber: string,
    poNumber: string,
    isDisableLoading = false
  ) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    const { zSetVendorName } = useOrderFormContext.getState();
    const { zSetLoadingPODetails } = useWSPODetailsContext.getState();
    if (!isDisableLoading) {
      zSetLoading(true);
    } else if (isDisableLoading) {
      zSetLoadingPODetails(true);
    }

    try {
      const response = await APIHelpers.GETWORKSHEETACTUALRECEIVEDPERSKU(
        skuNumber,
        poNumber
      );

      set({
        zWSPODList: response?.data,
      });

      zSetVendorName(response?.data[0].Vendor);

      zSetLoading(false);
      if (isDisableLoading) {
        zSetLoadingPODetails(false);
      }
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(
          `Error fetching getWorkSheetActualReceivedPerSku: ${error.message}`
        );
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
      return Error;
    }
  },
}));

export default useWSPODetailsContext;
