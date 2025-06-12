// src/store.ts
import create from "zustand";
import {
  SkuMasterModel,
  UpdateWorksheetfileOrderingRequest,
} from "../../../types/skumastermodel";
import * as APIHelpers from "../../../utils/helpers/APIHelpers";
import useSharedStore from "../../sharedStore";
import { SkuEnrollmentFormValues } from "../../../Pages/OrderAnalyst/SkuEnrollment/schema/skuEnrollmentFormSchema";
import {
  DELETED_SKU_MESSAGE,
  ERR_UNEXPECTED_ERROR_MESSAGE,
  UPDATED_FOR_ORDERING_STATUS_MESSAGE,
  UPDATED_SKU_MESSAGE,
} from "../../../constants/constants";

const initialData: SkuEnrollmentFormValues = {
  id: "",
  skuNumber: "",
  itemDescription: "",
  vendorCode: "",
  vendorName: "",
  foreignVendorName: "",
  foreignVendorCode: "",
  countryOrigin: "",
  itemStatus: "",
  shelfLifeWeeks: 0,
  trigger: 0,
  buildTo: 0,
  totalOrderLeadTime: 0,
  cbmPerCase: 0,
  totalCbmPerContainer: 0,
  tonPerCase: 0,
  poDay: "",
  buyer: "",
  // orderSpecialist: "",
  unitPerCase: 0,
  casePerPallet: 0,
  unitPerPallet: 0,
  totalTonPerContainer: 0,
  noOfPalletsPerContainer: 0,
  containerStacking: "",
  unitsPerContainer: 0,
  containerLoad: "",
  containerSize: "",
  moq: 0,
  mixLoadSkus: [],
};

//for definining of types

interface ManagerOrderingState {
  zSkuMasterList: SkuMasterModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetSkuMasterList: (zSkuMasterList: SkuMasterModel[]) => Promise<void>;
  zSkuSearchText: string;
  zSetSkuSearchText: (zSkuSearchText: string) => void;
  zIsSkuDialogOpen: boolean; // Tracks the state of the dialog
  zSetSkuDialogOpen: (zIsSkuDialogOpen: boolean) => void;
  zSkuDialogTitle: string;
  zSetSkuDialogTitle: (zSkuDialogTitle: string) => void;
  // fetchData: () => Promise<void>;
  createSkuMasterList: (data: SkuMasterModel) => Promise<void>;
  getAllSkus: (
    forOrderingStatus?: number,
    groupBy?: string,
    isPromise?: boolean
  ) => Promise<any[]>;
  getAllSkusDetails: (skuNumber: string) => Promise<void>;
  updateSku: (data: SkuMasterModel) => Promise<void>;
  deleteSku: (id: string, skuNumber: string) => Promise<void>;
  bulkInsertMasterlist: (file: File, createdBy: string) => Promise<any>;
  updateWorksheetfileOrdering: (
    data: UpdateWorksheetfileOrderingRequest
  ) => Promise<any>;
  modalData: SkuEnrollmentFormValues;
  setModalData: (data: SkuEnrollmentFormValues) => void;
  clearModalData: () => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useManagerOrderingContext = create<ManagerOrderingState>((set) => ({
  zSkuMasterList: null,
  zSetSkuMasterList: async (zSkuMasterList: SkuMasterModel[]) =>
    set({ zSkuMasterList }),
  zSkuSearchText: "",
  zIsSkuDialogOpen: false, // Initial state is closed
  zSetSkuDialogOpen: (zIsSkuDialogOpen: boolean) => set({ zIsSkuDialogOpen }),
  zSkuDialogTitle: "",
  zSetSkuDialogTitle: (zSkuDialogTitle: string) => set({ zSkuDialogTitle }),
  zSetSkuSearchText: (zSkuSearchText: string) => set({ zSkuSearchText }),
  modalData: initialData,
  setModalData: (data) => set({ modalData: data }),
  // fetchData: async () => {
  //   set({ zLoading: true, error: null });
  //   try {
  //     // Simulate network delay
  //     await new Promise((resolve) => setTimeout(resolve, 3000));

  //     const response = await axios.get(
  //       "https://jsonplaceholder.typicode.com/posts"
  //     );
  //     set({ data: response.data, zLoading: false });
  //   } catch (error: unknown) { // Type the error as `unknown` to handle it safely
  //     if (error instanceof AxiosError) {
  //       set({ error: error.message, zLoading: false });
  //     } else {
  //       // Handle other error types (e.g., network errors)
  //       set({ error: "An unexpected error occurred", zLoading: false });
  //     }
  //   }
  // },

  createSkuMasterList: async (data: SkuMasterModel): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();

    zSetLoading(true); // Start loading

    try {
      const response = await APIHelpers.CREATESKUMASTERLIST(data);

      // Check for specific error in the response
      if (response?.data.ErrorMessage === "Sku already exists!") {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return the error message as a string
      } else {
        zSetLoading(false);
        return "Sku created successfully"; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching createSkuMasterList: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getAllSkus: async (
    forOrderingStatus?: number,
    groupBy?: string,
    isPromise?: boolean
  ): Promise<any> => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();
    if (!isPromise) {
      zSetLoading(true);
    }

    try {
      const response = await APIHelpers.GETALLSKUS(
        zRoleId,
        zUserEmailAdd,
        forOrderingStatus
      );
      // console.log("response: ", response);
      set({ zSkuMasterList: response?.data.SkuMasterLists });
      zSetLoading(false);
      return response?.data.SkuMasterLists;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getAllSkus: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      if (!isPromise) {
        zSetLoading(false);
      }
    }
  },

  getAllSkusDetails: async (skuNumber: string) => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETSKUDETAILS(
        skuNumber,
        zRoleId,
        zUserEmailAdd
      );
      set({ zSkuMasterList: response?.data });
      zSetLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getAllSkusDetails: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  updateSku: async (data: SkuMasterModel): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.UPDATESKU(data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        zSetLoading(false);
        return UPDATED_SKU_MESSAGE; // Return success message
      } else {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching updateSku: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  deleteSku: async (id: string, skuNumber: string) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    const { getAllSkus } = useManagerOrderingContext.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.DELETESKU(id, skuNumber);
      console.log("response: ", response?.data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        getAllSkus();
        zSetLoading(false);
        return DELETED_SKU_MESSAGE; // Return success message
      } else {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching deleteSku: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  bulkInsertMasterlist: async (file: File): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();

    zSetLoading(true); // Start loading

    try {
      const response = await APIHelpers.BIMASTERLIST(file);

      // Check for specific error in the response
      if (response?.data.ErrorMessage !== "") {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return the error message as a string
      } else {
        zSetLoading(false);
        return "Bulk Insert Successfully"; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching bulkInsertMasterlist: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  updateWorksheetfileOrdering: async (
    data: UpdateWorksheetfileOrderingRequest
  ): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.UPDATEFORORDERINGSTATUS(data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        zSetLoading(false);
        return UPDATED_FOR_ORDERING_STATUS_MESSAGE; // Return success message
      } else {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching updateSku: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  clearModalData: async () => {
    set({ modalData: initialData });
  },
}));

export default useManagerOrderingContext;
