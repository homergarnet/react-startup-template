// src/store.ts
import { create } from "zustand";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SkuMasterModel } from "../../../types/skumastermodel";
import * as APIHelpers from "../../../utils/helpers/APIHelpers";
import useSharedStore from "../../sharedStore";
import { SkuEnrollmentFormValues } from "../../../Pages/OrderAnalyst/SkuEnrollment/schema/skuEnrollmentFormSchema";
import { DELETED_SKU_MESSAGE, UPDATED_SKU_MESSAGE } from "../../../constants/constants";

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
  mixLoadSkus: "",
};

//for definining of types

interface OrderFormState {
  zSkuMasterList: SkuMasterModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetSkuMasterList: (zSkuMasterList: SkuMasterModel[]) => Promise<void>;
  zSkuMasterGBBuyerList: SkuMasterModel[] | null;
  zSetSkuMasterGBBuyerList: (zSkuMasterGBBuyerList: SkuMasterModel[]) => Promise<void>;
  zSkuMasterGBVNameList: SkuMasterModel[] | null;
  zSetSkuMasterGBVNameList: (zSkuMasterGBVNameList: SkuMasterModel[]) => Promise<void>;
  zSkuEnrollmentTab: number;
  zSetSkuEnrollmentTab: (zSkuEnrollmentTab: number) => void;
  error: string | null;
  zSkuSearchText: string;
  zSetSkuSearchText: (zSkuSearchText: string) => void;
  zIsSkuDialogOpen: boolean; // Tracks the state of the dialog
  zSetSkuDialogOpen: (zIsSkuDialogOpen: boolean) => void;
  zSkuDialogTitle: string;
  zSetSkuDialogTitle: (zSkuDialogTitle: string) => void;
  // fetchData: () => Promise<void>;
  createSkuMasterList: (data: SkuMasterModel) => Promise<void>;
  getAllSkus: () => Promise<void>;
  getAllSkusDetails: (skuNumber: string) => Promise<void>;
  updateSku: (data: SkuMasterModel) => Promise<void>;
  deleteSku: (id: string) => Promise<void>;
  modalData: SkuEnrollmentFormValues;
  setModalData: (data: SkuEnrollmentFormValues) => void;
  clearModalData: () => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useSkuMasterListContext = create<OrderFormState>((set) => ({
  zSkuMasterList: null,
  zSetSkuMasterList: async (zSkuMasterList: SkuMasterModel[]) => set({ zSkuMasterList }),
  zSkuMasterGBBuyerList: null,
  zSetSkuMasterGBBuyerList: async (zSkuMasterGBBuyerList: SkuMasterModel[]) => set({ zSkuMasterGBBuyerList }),
  zSkuMasterGBVNameList: null,
  zSetSkuMasterGBVNameList: async (zSkuMasterGBVNameList: SkuMasterModel[]) => set({ zSkuMasterGBVNameList }),
  zSkuEnrollmentTab: 0,
  zSetSkuEnrollmentTab: (zSkuEnrollmentTab: number) => set({ zSkuEnrollmentTab }),
  error: null,
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
    const { zSetLoading } = useSharedStore.getState();

    zSetLoading(true); // Start loading

    try {
      const response = await APIHelpers.CREATESKUMASTERLIST(data);

      // Check for specific error in the response
      if (response?.data.ErrorMessage === "Sku already exists!") {
        set({ error: response?.data.ErrorMessage });
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return the error message as a string
      } else {
        set({ error: null });
        zSetLoading(false);
        return "Sku created successfully"; // Return success message
      }
    } catch (error: unknown) {
      zSetLoading(false); // Always stop loading

      if (error instanceof AxiosError) {
        // If the error is an Axios error, handle it specifically
        set({ error: error.message });
        return `Error: ${error.message}`; // Return error message as string
      } else {
        // Handle other types of errors (e.g., network or unexpected)
        set({ error: "An unexpected error occurred" });
        return "An unexpected error occurred"; // Return generic error message
      }
    }
  },

  getAllSkus: async () => {
    const { zSetLoading } = useSharedStore.getState();
    const { zSetSkuMasterGBBuyerList, zSetSkuMasterGBVNameList } = useSkuMasterListContext.getState();
    zSetLoading(true);
    try {

      const response = await APIHelpers.GETALLSKUS();
      // console.log("response: ", response);
      set({ zSkuMasterList: response?.data.SkuMasterLists, error: null });
      zSetLoading(false);

      let tempSkuMasterList: SkuMasterModel[] = [];
      // Group by 'Buyer'
      const groupedByBuyer = response?.data.SkuMasterLists.reduce((acc: any, item: SkuMasterModel) => {
        const { Buyer } = item; // Extract Buyer
        if (!acc[Buyer]) {
          acc[Buyer] = []; // Initialize an array for each Buyer
        }
        acc[Buyer].push(item); // Push the current item into the Buyer's group
        return acc;
      }, {});

      const groupedByVendorName = response?.data.SkuMasterLists.reduce((acc: any, item: SkuMasterModel) => {
        const { VendorName } = item; // Extract Buyer
        if (!acc[VendorName]) {
          acc[VendorName] = []; // Initialize an array for each Buyer
        }
        acc[VendorName].push(item); // Push the current item into the Buyer's group
        return acc;
      }, {});

      // console.log("groupedByBuyer: ", groupedByBuyer);

      Object.keys(groupedByBuyer).forEach((buyer) => {
        // console.log(`Buyer: ${buyer}`);
        // console.log("Items: ", groupedByBuyer[buyer]);
        tempSkuMasterList.push(...groupedByBuyer[buyer]);
      });

      zSetSkuMasterGBBuyerList(tempSkuMasterList);

      tempSkuMasterList = [];

      Object.keys(groupedByVendorName).forEach((vendorName) => {
        // console.log(`Buyer: ${buyer}`);
        // console.log("Items: ", groupedByBuyer[buyer]);
        tempSkuMasterList.push(...groupedByVendorName[vendorName]);
      });


      zSetSkuMasterGBVNameList(tempSkuMasterList);
    } catch (error: unknown) { // Type the error as `unknown` to handle it safely

      if (error instanceof AxiosError) {
        set({ error: error.message });
        zSetLoading(false);
      } else {
        // Handle other error types (e.g., network errors)
        set({ error: "An unexpected error occurred" });
        zSetLoading(false);
      }

    }

  },

  getAllSkusDetails: async (skuNumber: string) => {

    const { zSetLoading } = useSharedStore.getState();
    zSetLoading(true);

    try {

      const response = await APIHelpers.GETSKUDETAILS(skuNumber);
      set({ zSkuMasterList: response?.data });
      zSetLoading(false);

    } catch (error: unknown) { // Type the error as `unknown` to handle it safely

      if (error instanceof AxiosError) {
        set({ error: error.message });
        zSetLoading(false);
      } else {
        // Handle other error types (e.g., network errors)
        set({ error: "An unexpected error occurred" });
        zSetLoading(false);
      }

    }

  },

  updateSku: async (data: SkuMasterModel): Promise<any> => {

    const { zSetLoading } = useSharedStore.getState();
    zSetLoading(true);

    try {

      const response = await APIHelpers.UPDATESKU(data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        set({ error: null });
        zSetLoading(false);
        return UPDATED_SKU_MESSAGE; // Return success message
      } else {
        set({ error: response?.data.ErrorMessage });
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }

    } catch (error: unknown) { // Type the error as `unknown` to handle it safely

      if (error instanceof AxiosError) {
        set({ error: error.message });
        zSetLoading(false);
      } else {
        // Handle other error types (e.g., network errors)
        set({ error: "An unexpected error occurred" });
        zSetLoading(false);
      }

    }

  },

  deleteSku: async (id: string) => {

    const { zSetLoading } = useSharedStore.getState();
    const { getAllSkus } = useSkuMasterListContext.getState();
    zSetLoading(true);

    try {

      const response = await APIHelpers.DELETESKU(id);
      console.log("response: ", response?.data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
        getAllSkus();
        set({ error: null });
        zSetLoading(false);
        return DELETED_SKU_MESSAGE; // Return success message
      } else {
        set({ error: response?.data.ErrorMessage });
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return success message
      }

    } catch (error: unknown) { // Type the error as `unknown` to handle it safely

      if (error instanceof AxiosError) {
        set({ error: error.message });
        zSetLoading(false);
      } else {
        // Handle other error types (e.g., network errors)
        set({ error: "An unexpected error occurred" });
        zSetLoading(false);
      }

    }

  },

  clearModalData: async () => {
    set({ modalData: initialData });
  }

}));

export default useSkuMasterListContext;