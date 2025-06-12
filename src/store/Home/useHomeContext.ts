import create from "zustand";
import useSharedStore from "../sharedStore";
import * as APIHelpers from "../../utils/helpers/APIHelpers";
import {
  CREATED_WITH_PO_MESSAGE,
  ERR_UNEXPECTED_ERROR_MESSAGE,
  UPDATED_WORKSHEET_STATUS_MESSAGE,
} from "../../constants/constants";
import {
  CreateOrUpdateIsPORequest,
  DashboardModel,
  UpdateAdjustedRequest,
  UpdateWorksheetRequest,
  WorksheetObj,
} from "../../types/dashboardmodel";
import { MondayToFridayModel } from "../../types/mondayToFridayModel";
import ISkuMap from "../../Pages/OrderAnalyst/Home/Interface/ISkuMap";
import debounce from "lodash.debounce";
import { useCallback } from "react";

interface HomeState {
  zHomeTblList: DashboardModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetHomeTblList: (zHomeTblList: DashboardModel[]) => Promise<void>;
  zWorksheetObj: WorksheetObj | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetWorksheetObj: (zWorksheetObj: WorksheetObj) => Promise<void>;
  zMondayToFriday: MondayToFridayModel | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetMondayToFriday: (zMondayToFriday: MondayToFridayModel) => Promise<void>;
  zSelectDay: string;
  zSetSelectDay: (zSelectDay: string) => void;
  zIsWorksheetStatusChange: boolean;
  zSetIsWorksheetStatusChange: (zIsWorksheetStatusChange: boolean) => void;
  zOrderFormReRender: number;
  zSetOrderFormReRender: (zOrderFormReRender: number) => void;
  zSku: string;
  zSetSku: (zSku: string) => void;
  zSkuMap: Map<string, ISkuMap>;
  addOrUpdateUniqueSku: (
    sku: string,
    adjustedWeekSupply: number,
    adjustedOrder: number
  ) => void;
  //for running it once after looping
  addOrUpdateUniqueSkuWithDebounce: (
    sku: string,
    adjustedWeekSupply: number,
    adjustedOrder: number
  ) => void;
  removeSku: (sku: string) => void;
  // Add this line below
  resetZSkuMap: () => void;
  zSystemGeneratedCount: number;
  zSetSystemGeneratedCount: (zSystemGeneratedCount: number) => void;
  zToReviewManagerCount: number;
  zSetToReviewManagerCount: (zToReviewManagerCount: number) => void;
  zApprovedCount: number;
  zSetApprovedCount: (zApprovedCount: number) => void;
  zWithPOCount: number;
  zSetWithPOCount: (zWithPOCount: number) => void;
  zSkuSearchText: string;
  zSetSkuSearchText: (zSkuSearchText: string) => void;
  // to get the list of sku and adjusted week supply for saving
  zCheckedItemsCache: Record<string, boolean>;
  zSetCheckedItemsCache: (zCheckedItemsCache: Record<string, boolean>) => void;
  zPalletsPerContainer: number;
  zSetPalletsPerContainer: (zPalletsPerContainer: number) => void;
  zCasesPerContainer: number;
  zSetCasesPerContainer: (zCasesPerContainer: number) => void;
  zTotalPallets: number;
  zSetTotalPallets: (zTotalPallets: number) => void;
  zMoqUnits: number;
  zSetMoqUnits: (zMoqUnits: number) => void;
  zAutomationMessage: string;
  zSetAutomationMessage: (zAutomationMessage: string) => void;
  updateZCheckedItemsCache: (
    zCheckedItemsCache: Record<string, boolean>
  ) => void;
  toggleZCheckedItemsCache: (skuNumber: string, isChecked: boolean) => void;
  resetZCheckedItemsCache: () => void;
  getTableList: (
    keyword: string,
    wsStatus: number,
    page: number,
    pageSize: number
  ) => Promise<any>;
  getTableListBySkuNumber: (
    keyword: string,
    wsStatus: number,
    skuNumbers: string,
    skip: number,
    take: number
  ) => Promise<any>;
  getWithPOList: (
    keyword: string,
    page: number,
    pageSize: number
  ) => Promise<any>;
  getMonToFriCount: () => Promise<any>;
  scorecardDetailsCount: () => Promise<any>;
  updateWorksheetStatus: (data: UpdateWorksheetRequest) => Promise<any>;
  updateAdjustedBySku: (data: UpdateAdjustedRequest) => Promise<any>;
  createOrUpdateIsPO: (data: CreateOrUpdateIsPORequest) => Promise<any>;
}

// Debounced function for updating SKU map
const debouncedUpdateSku = debounce(
  (
    set: (fn: (state: HomeState) => Partial<HomeState>) => void,
    sku: string,
    adjustedWeekSupply: number,
    adjustedOrder: number
  ) => {
    set((state) => {
      // console.log("sku: ", sku);
      // console.log("adjustedWeekSupply: ", adjustedWeekSupply);
      const newMap = new Map(state.zSkuMap);
      newMap.set(sku, { sku, adjustedWeekSupply, adjustedOrder });

      return { zSkuMap: newMap }; // FIXED: Ensure the correct key name
    });
  },
  1000 // Debounce time
);

const useHomeContext = create<HomeState>((set) => ({
  zHomeTblList: null,
  zSetHomeTblList: async (zHomeTblList: DashboardModel[]) =>
    set({ zHomeTblList }),
  zWorksheetObj: null,
  zSetWorksheetObj: async (zWorksheetObj: WorksheetObj) =>
    set({ zWorksheetObj }),
  zMondayToFriday: null,
  zSetMondayToFriday: async (zMondayToFriday: MondayToFridayModel) =>
    set({ zMondayToFriday }),
  zSelectDay: "",
  zSetSelectDay: (zSelectDay: string) => set({ zSelectDay }),
  zIsWorksheetStatusChange: false,
  zSetIsWorksheetStatusChange: (zIsWorksheetStatusChange: boolean) =>
    set({ zIsWorksheetStatusChange }),
  zOrderFormReRender: 0,
  zSetOrderFormReRender: (zOrderFormReRender: number) =>
    set({ zOrderFormReRender }),
  zSku: "",
  zSetSku: (zSku: string) => set({ zSku }),
  zSkuMap: new Map(),
  addOrUpdateUniqueSku: (
    sku: string,
    adjustedWeekSupply: number,
    adjustedOrder: number
  ): void => {
    set((state) => {
      const newMap = new Map(state.zSkuMap);
      newMap.set(sku, { sku, adjustedWeekSupply, adjustedOrder });
      return { zSkuMap: newMap };
    });
  },
  addOrUpdateUniqueSkuWithDebounce: (
    sku,
    adjustedWeekSupply,
    adjustedOrder
  ) => {
    debouncedUpdateSku(set, sku, adjustedWeekSupply, adjustedOrder);
  },
  removeSku: (sku) => {
    set((state) => {
      const newMap = new Map(state.zSkuMap);
      newMap.delete(sku);
      return { zSkuMap: newMap };
    });
  },
  resetZSkuMap: () => {
    set({ zSkuMap: new Map() });
  },
  zSystemGeneratedCount: 0,
  zSetSystemGeneratedCount: (zSystemGeneratedCount: number) =>
    set({ zSystemGeneratedCount }),
  zToReviewManagerCount: 0,
  zSetToReviewManagerCount: (zToReviewManagerCount: number) =>
    set({ zToReviewManagerCount }),
  zApprovedCount: 0,
  zSetApprovedCount: (zApprovedCount: number) => set({ zApprovedCount }),
  zWithPOCount: 0,
  zSetWithPOCount: (zWithPOCount: number) => set({ zWithPOCount }),
  zSkuSearchText: "",
  zSetSkuSearchText: (zSkuSearchText: string) => set({ zSkuSearchText }),
  zCheckedItemsCache: {},
  zSetCheckedItemsCache: (zCheckedItemsCache) => set({ zCheckedItemsCache }),
  zPalletsPerContainer: 0,
  zSetPalletsPerContainer: (zPalletsPerContainer: number) =>
    set({ zPalletsPerContainer }),
  zCasesPerContainer: 0,
  zSetCasesPerContainer: (zCasesPerContainer: number) =>
    set({ zCasesPerContainer }),
  zTotalPallets: 0,
  zSetTotalPallets: (zTotalPallets: number) => set({ zTotalPallets }),
  zMoqUnits: 0,
  zSetMoqUnits: (zMoqUnits: number) => set({ zMoqUnits }),
  zAutomationMessage: "",
  zSetAutomationMessage: (zAutomationMessage: string) =>
    set({ zAutomationMessage }),
  updateZCheckedItemsCache: (zCheckedItemsCache) =>
    set((state) => ({
      zCheckedItemsCache: {
        ...state.zCheckedItemsCache,
        ...zCheckedItemsCache,
      },
    })),
  toggleZCheckedItemsCache: (skuNumber: string, isChecked: boolean) =>
    set((state) => ({
      zCheckedItemsCache: {
        ...state.zCheckedItemsCache,
        [skuNumber]: isChecked,
      },
    })),
  resetZCheckedItemsCache: () => set({ zCheckedItemsCache: {} }),
  getTableList: async (
    keyword: string,
    wsStatus: number,
    page: number,
    pageSize: number
  ) => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();

    zSetLoading(true);

    try {
      const response = await APIHelpers.GETHOMETBLLIST(
        keyword,
        wsStatus,
        page,
        pageSize
      );
      set({ zHomeTblList: response?.data.HomeTblList });
      zSetLoading(false);
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getTableList: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getTableListBySkuNumber: async (
    keyword: string,
    wsStatus: number,
    skuNumbers: string,
    skip: number,
    take: number
  ) => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();

    zSetLoading(true);

    try {
      const response = await APIHelpers.GETTABLELISTBYSKUNUMBER(
        keyword,
        wsStatus,
        skuNumbers,
        skip,
        take
      );
      // set({ zHomeTblList: response?.data.HomeTblList });
      zSetLoading(false);
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getTableListBySkuNumber: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getWithPOList: async (keyword: string, page: number, pageSize: number) => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();

    zSetLoading(true);

    try {
      const response = await APIHelpers.GETWITHPOLIST(keyword, page, pageSize);
      zSetLoading(false);
      return response?.data.WithPOList;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getWithPOList: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getMonToFriCount: async () => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETMONTOFRICOUNT();
      set({ zMondayToFriday: response?.data.MondayToFriday });
      zSetLoading(false);
      return response?.data.MondayToFriday;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getMonToFriCount: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  scorecardDetailsCount: async () => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETSCORECARDDETAILSCOUNT();
      set({
        zSystemGeneratedCount: response?.data.SystemGeneratedCount,
        zToReviewManagerCount: response?.data.ToReviewManagerCount,
        zApprovedCount: response?.data.ToApprovedCount,
        zWithPOCount: response?.data.WithPOCount,
      });
      zSetLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching scorecardDetailsCount: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  updateWorksheetStatus: async (data: UpdateWorksheetRequest): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.UPDATEWORKSHEETSTATUS(data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        zSetLoading(false);
        return UPDATED_WORKSHEET_STATUS_MESSAGE; // Return success message
      } else {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching updateWorksheetStatus: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  updateAdjustedBySku: async (data: UpdateAdjustedRequest): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.UPDATEADJUSTEDBYSKU(data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        zSetLoading(false);
        return UPDATED_WORKSHEET_STATUS_MESSAGE; // Return success message
      } else {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching updateWorksheetStatus: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  createOrUpdateIsPO: async (data: CreateOrUpdateIsPORequest): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.CREATEORUPDATEPOISPO(data);

      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        zSetLoading(false);
        return CREATED_WITH_PO_MESSAGE; // Return success message
      } else {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching createOrUpdateIsPO: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },
}));

export default useHomeContext;
