// src/store.ts
import create from "zustand";
import useSharedStore from "../../sharedStore";
import * as APIHelpers from "../../../utils/helpers/APIHelpers";
import { AxiosError } from "axios";
import { IWorksheetDetailsState } from "../../../Pages/OrderAnalyst/OrderForm/Interface/IWorksheetDetails";
import IOrderFormList from "../../../Pages/OrderAnalyst/OrderForm/Interface/IOrderFormList";
import { WorksheetDataModel } from "../../../types/worksheetDataModel";
import { WorkSheetHistoryModel } from "../../../types/worksheethistory";
import { ERR_UNEXPECTED_ERROR_MESSAGE } from "../../../constants/constants";
// Define types for the store state
interface OrderFormState {
  zExpanded: boolean;
  zSetExpanded: (zExpanded: boolean) => void;
  zIsScroll: boolean;
  zSetIsScroll: (zIsScroll: boolean) => void;
  zWorksheetDetails: IWorksheetDetailsState | null;
  zSetWorksheetDetails: (
    zWorksheetDetails: IWorksheetDetailsState
  ) => Promise<void>;
  zOrderFormList: IOrderFormList[] | null;
  zSetOrderFormList: (zOrderFormList: IOrderFormList[]) => Promise<void>;
  zWorksheetHistory: WorkSheetHistoryModel[] | null;
  zSetWorksheetHistory: (
    zWorksheetHistory: WorkSheetHistoryModel[]
  ) => Promise<void>;
  zOrderFormSearch: string;
  zSetOrderFormSearch: (zOrderFormSearch: string) => void;
  // for saving worksheet data
  // for getting the prompt save data
  zPrevOrderFormSearch: string;
  zSetPrevOrderFormSearch: (zPrevOrderFormSearch: string) => void;
  zSalesManualAdjustedWeeks: string;
  zSetSalesManualAdjustedWeeks: (zSalesManualAdjustedWeeks: string) => void;
  // for saving worksheet data
  zSalesManualAdjustedValue: string;
  zSetSalesManualAdjustedValue: (zSalesManualAdjustedValue: string) => void;
  zCurrentWeek: string;
  zSetCurrentWeek: (zCurrentWeek: string) => void;
  zBaseLineLastYear: number;
  zSetBaseLineLastYear: (zBaseLineLastYear: number) => void;
  zBaseLineLastYearCache: number;
  zSetBaseLineLastYearCache: (zBaseLineLastYearCache: number) => void;
  zBaseLineThisYear: number;
  zSetBaseLineThisYear: (zBaseLineThisYear: number) => void;
  zBaseLineThisYearCache: number;
  zSetBaseLineThisYearCache: (zBaseLineThisYearCache: number) => void;
  zCurrentWeekSupply: number;
  zSetCurrentWeekSupply: (zCurrentWeekSupply: number) => void;
  zProjectedWeekSupply: number;
  zSetProjectedWeekSupply: (zProjectedWeekSupply: number) => void;
  zFirstSuggestedOrder: number;
  zSetFirstSuggestedOrder: (zFirstSuggestedOrder: number) => void;
  zIsClearLYTYBaseLine: boolean;
  zSetIsClearLYTYBaseLine: (zIsClearLYTYBaseLine: boolean) => void;
  zCurrentWeekHighlight: string;
  zSetCurrentWeekHighlight: (zCurrentWeekHighlight: string) => void;
  zZindex: number;
  zSetZindex: (zZindex: number) => void; // Add the setter function types
  zFocusField: string | null;
  zSetFocusField: (zFocusField: string | null) => void;
  zIsFirstLoad: boolean;
  zSetIsFirstLoad: (zIsFirstLoad: boolean) => void;
  zNextLeadTime: string;
  zSetNextLeadTime: (zNextLeadTime: string) => void;
  zIsSaveOrder: boolean;
  zSetIsSaveOrder: (zIsSaveOrder: boolean) => void;
  zIsTriggerCreateWsData: boolean;
  zSetIsTriggerCreateWsData: (zIsTriggerCreateWsData: boolean) => void;
  //trigger for save with or without save
  zIsTriggerWithWithoutSave: boolean;
  zSetIsTriggerWithWithoutSave: (zIsTriggerWithWithoutSave: boolean) => void;
  zIsOriginalClick: boolean;
  zSetIsOriginalClick: (zIsOriginalClick: boolean) => void;
  zPoWeekNumber: string;
  zSetPoWeekNumber: (zPoWeekNumber: string) => void;
  zVendorName: string;
  zSetVendorName: (zVendorName: string) => void;
  zSuggestedWeekNo: string;
  zSetSuggestedWeekNo: (zSuggestedWeekNo: string) => void;
  zAdjustedOrder: number;
  zSetAdjustedOrder: (zAdjustedOrder: number) => void;
  zMixedSkuNumbers: string[];
  zSetMixedSkuNumbers: (zMixedSkuNumbers: string[]) => void;
  zPalletTotalCount: number;
  zSetPalletTotalCount: (zPalletTotalCount: number) => void;
  zGreenCurrentWeekNo: string;
  zSetGreenCurrentWeekNo: (zGreenCurrentWeekNo: string) => void;
  zGreenCurrentWeekSupply: number;
  zSetGreenCurrentWeekSupply: (zGreenCurrentWeekSupply: number) => void;
  getWorkSheetDetails: (
    skuNumber: string,
    userEmailAdd: string
  ) => Promise<void>;
  createWorkSheetData: (data: WorksheetDataModel) => Promise<any>;
  getAllMixedSkusBySku: (skuNumber: string) => Promise<void>;
}

// Create the Zustand store with type annotations
const useOrderFormContext = create<OrderFormState>((set) => ({
  zExpanded: false,
  zSetExpanded: (zExpanded: boolean) => set({ zExpanded }),
  zIsScroll: false,
  zSetIsScroll: (zIsScroll: boolean) => set({ zIsScroll }),
  zWorksheetDetails: null,
  zSetWorksheetDetails: async (zWorksheetDetails: IWorksheetDetailsState) =>
    set({ zWorksheetDetails }),
  zOrderFormList: null,
  zSetOrderFormList: async (zOrderFormList: IOrderFormList[]) =>
    set({ zOrderFormList }),
  zWorksheetHistory: null,
  zSetWorksheetHistory: async (zWorksheetHistory: WorkSheetHistoryModel[]) =>
    set({ zWorksheetHistory }),
  zOrderFormSearch: "",
  zSetOrderFormSearch: (zOrderFormSearch: string) => set({ zOrderFormSearch }),
  zPrevOrderFormSearch: "",
  zSetPrevOrderFormSearch: (zPrevOrderFormSearch: string) =>
    set({ zPrevOrderFormSearch }),
  zSalesManualAdjustedWeeks: "",
  zSetSalesManualAdjustedWeeks: (zSalesManualAdjustedWeeks: string) =>
    set({ zSalesManualAdjustedWeeks }),
  zSalesManualAdjustedValue: "",
  zSetSalesManualAdjustedValue: (zSalesManualAdjustedValue: string) =>
    set({ zSalesManualAdjustedValue }),
  zCurrentWeek: "",
  zSetCurrentWeek: (zCurrentWeek: string) => set({ zCurrentWeek }),
  zBaseLineLastYear: 0,
  zSetBaseLineLastYear: (zBaseLineLastYear: number) =>
    set({ zBaseLineLastYear }),
  zBaseLineLastYearCache: 0,
  zSetBaseLineLastYearCache: (zBaseLineLastYearCache: number) =>
    set({ zBaseLineLastYearCache }),
  zBaseLineThisYear: 0,
  zSetBaseLineThisYear: (zBaseLineThisYear: number) =>
    set({ zBaseLineThisYear }),
  zBaseLineThisYearCache: 0,
  zSetBaseLineThisYearCache: (zBaseLineThisYearCache: number) =>
    set({ zBaseLineThisYearCache }),
  zCurrentWeekSupply: 0,
  zSetCurrentWeekSupply: (zCurrentWeekSupply: number) =>
    set({ zCurrentWeekSupply }),
  zProjectedWeekSupply: 0,
  zSetProjectedWeekSupply: (zProjectedWeekSupply: number) =>
    set({ zProjectedWeekSupply }),
  zFirstSuggestedOrder: 0,
  zSetFirstSuggestedOrder: (zFirstSuggestedOrder: number) =>
    set({ zFirstSuggestedOrder }),
  zIsClearLYTYBaseLine: false,
  zSetIsClearLYTYBaseLine: (zIsClearLYTYBaseLine: boolean) =>
    set({ zIsClearLYTYBaseLine }),
  zCurrentWeekHighlight: "",
  zSetCurrentWeekHighlight: (zCurrentWeekHighlight: string) =>
    set({ zCurrentWeekHighlight }),
  zZindex: 1,
  zSetZindex: (zZindex: number) => set({ zZindex }),
  zFocusField: null,
  zSetFocusField: (zFocusField: string | null) => set({ zFocusField }),
  zIsFirstLoad: false,
  zSetIsFirstLoad: (zIsFirstLoad: boolean) => set({ zIsFirstLoad }),
  zNextLeadTime: "",
  zSetNextLeadTime: (zNextLeadTime: string) => set({ zNextLeadTime }),
  zIsSaveOrder: true,
  zSetIsSaveOrder: (zIsSaveOrder: boolean) => set({ zIsSaveOrder }),
  zIsTriggerCreateWsData: false,
  zSetIsTriggerCreateWsData: (zIsTriggerCreateWsData: boolean) =>
    set({ zIsTriggerCreateWsData }),
  zIsTriggerWithWithoutSave: false,
  zSetIsTriggerWithWithoutSave: (zIsTriggerWithWithoutSave: boolean) =>
    set({ zIsTriggerWithWithoutSave }),
  zIsOriginalClick: false,
  zSetIsOriginalClick: (zIsOriginalClick: boolean) => set({ zIsOriginalClick }),
  zPoWeekNumber: "",
  zSetPoWeekNumber: (zPoWeekNumber: string) => set({ zPoWeekNumber }),
  zVendorName: "",
  zSetVendorName: (zVendorName: string) => set({ zVendorName }),
  zSuggestedWeekNo: "",
  zSetSuggestedWeekNo: (zSuggestedWeekNo: string) => set({ zSuggestedWeekNo }),
  zAdjustedOrder: 0,
  zSetAdjustedOrder: (zAdjustedOrder: number) => set({ zAdjustedOrder }),
  zMixedSkuNumbers: [],
  zSetMixedSkuNumbers: (zMixedSkuNumbers: string[]) =>
    set({ zMixedSkuNumbers }),
  zPalletTotalCount: -1,
  zSetPalletTotalCount: (zPalletTotalCount: number) =>
    set({ zPalletTotalCount }),
  zGreenCurrentWeekNo: "",
  zSetGreenCurrentWeekNo: (zGreenCurrentWeekNo: string) => set({ zGreenCurrentWeekNo }),
  zGreenCurrentWeekSupply: 0,
  zSetGreenCurrentWeekSupply: (zGreenCurrentWeekSupply: number) => set({ zGreenCurrentWeekSupply }),
  getWorkSheetDetails: async (skuNumber: string, userEmailAdd: string) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETWORKSHEETDETAILS(
        skuNumber,
        userEmailAdd
      );
      console.log("response?.data: ", response?.data);
      set({ zWorksheetDetails: response?.data });
      // let data = response?.data.SkuMasterLists[0];
      // if (data != null) {
      //   const updatedData: SkuEnrollmentFormValues = {
      //     id: data.Id,
      //     skuNumber: data.SkuNumber,
      //     itemDescription: data.ItemDescription,
      //     vendorCode: data.VendorCode,
      //     vendorName: data.VendorName,
      //     foreignVendorName: data.ForeignVendorName,
      //     foreignVendorCode: data.ForeignVendorCode,
      //     countryOrigin: data.CountryOrigin,
      //     itemStatus: data.ItemStatus,
      //     shelfLifeWeeks: data.ShelfLifeWeeks,
      //     trigger: data.Trigger,
      //     buildTo: data.BuildTo,
      //     totalOrderLeadTime: data.TotalOrderLeadTime,
      //     cbmPerCase: data.CbmPerCase,
      //     totalCbmPerContainer: data.TotalCbmPerContainer,
      //     tonPerCase: data.TonPerCase,
      //     poDay: data.PoDay,
      //     buyer: data.Buyer,
      //     // orderSpecialist: data.OrderSpecialist,
      //     unitPerCase: data.UnitPerCase,
      //     casePerPallet: data.CasePerPallet,
      //     unitPerPallet: data.UnitPerPallet,
      //     totalTonPerContainer: data.TotalTonPerContainer,
      //     noOfPalletsPerContainer: data.NoOfPalletsPerContainer,
      //     containerStacking: data.ContainerStacking,
      //     unitsPerContainer: data.UnitsPerContainer,
      //     containerLoad: data.ContainerLoad,
      //     containerSize: data.ContainerSize,
      //     moq: data.Moq,
      //     mixLoadSkus: data.MixLoadSkus,
      //   };
      //   useSkuEnrollmentContext.getState().zSetSkuEnrollmentAEData(updatedData);
      // }

      // set({ zSkuMasterList: response?.data.SkuMasterLists });
      zSetLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getWorkSheetDetails: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  createWorkSheetData: async (data: WorksheetDataModel): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();

    zSetLoading(true); // Start loading

    try {
      const response = await APIHelpers.CREATEWORKSHEETDATA(data);

      // Check for specific error in the response
      if (response?.data.ErrorMessage === "Sku already exists!") {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return the error message as a string
      } else {
        zSetLoading(false);
        return response?.data.GenericMessage; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching createWorkSheetData: ${error.message}`);
        return error?.message;
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
      return error;
    } finally {
      zSetLoading(false);
    }
  },

  getAllMixedSkusBySku: async (skuNumber: string) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETALLMIXEDSKUSBYSKU(skuNumber);
      console.log("response?.data: ", response?.data);
      let skuNumbers = response?.data.SkuNumbers;
      let pallets = response?.data.Pallets;
      let palletTotalCount = response?.data.PalletTotalCount;
      let mixedSkuNumbersWithPallets = [];
      for (let i = 0; i < skuNumbers.length; i++) {
        mixedSkuNumbersWithPallets.push(
          skuNumbers[i] + " - " + pallets[i] + " pallets"
        );
      }
      set({
        zMixedSkuNumbers: mixedSkuNumbersWithPallets,
        zPalletTotalCount: palletTotalCount > -1 ? palletTotalCount : -1,
      });
      // set({ zSkuMasterList: response?.data.SkuMasterLists });
      zSetLoading(false);
    } catch (error: unknown) {
      set({
        zMixedSkuNumbers: [],
        zPalletTotalCount: -1,
      });
      if (error instanceof Error) {
        // zSetError(`Error fetching getAllMixedSkusBySku: ${error.message}`);
      } else {
        // zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },
}));

export default useOrderFormContext;
