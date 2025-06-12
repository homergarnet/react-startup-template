// src/store.ts
import create from "zustand";
import { AxiosError } from "axios";
import { SkuMasterModel } from "../../../types/skumastermodel";
import * as APIHelpers from "../../../utils/helpers/APIHelpers";
import useSharedStore from "../../sharedStore";
import { SkuEnrollmentFormValues } from "../../../Pages/OrderAnalyst/SkuEnrollment/schema/skuEnrollmentFormSchema";
import {
  ADD_SKU,
  DELETED_SKU_MESSAGE,
  ERR_UNEXPECTED_ERROR_MESSAGE,
  UPDATED_SKU_MESSAGE,
} from "../../../constants/constants";
import { SkuDetailsInquiry } from "../../../types/skudetailsinquiry";
import { BuyerModel } from "../../../types/buyermodel";
import { formatNumber } from "../../../utils/formatNumber";
import { GetAllSkuNumModel } from "../../../types/skuenrollmentmodel";

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
  shelfLifeWeeks: 1,
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

interface OrderFormState {
  zSkuMasterList: SkuMasterModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetSkuMasterList: (zSkuMasterList: SkuMasterModel[]) => Promise<void>;
  zSkuEnrollmentTab: number;
  zSetSkuEnrollmentTab: (zSkuEnrollmentTab: number) => void;
  zSkuSearchText: string;
  zSetSkuSearchText: (zSkuSearchText: string) => void;
  zSkuAddEditTitle: string;
  zSetSkuAddEditTitle: (zSkuAddEditTitle: string) => void;
  zSkuDetailsInquiry: SkuDetailsInquiry | null;
  zSetSkuDetailsInquiry: (
    zSkuDetailsInquiry: SkuDetailsInquiry
  ) => Promise<void>;
  zBuyerList: BuyerModel[] | null;
  zSetBuyerList: (zBuyerList: BuyerModel[]) => Promise<void>;
  zAllSkuNumList: GetAllSkuNumModel[] | null;
  zSetAllSkuNumList: (zAllSkuNumList: GetAllSkuNumModel[]) => Promise<void>;
  zSkuNumberTF: string;
  zSetSkuNumberTF: (zSkuNumberTF: string) => void;
  zIsExistInUser: boolean;
  zSetIsExistInUser: (zIsExistInUser: boolean) => void;
  // for shelf life weeks radio button
  zNAValue: string;
  zSetNAValue: (zNAValue: string) => void;
  // for mix load skus radio button
  zMixLoadPrimaryValue: string;
  zSetMixLoadPrimaryValue: (zMixLoadPrimaryValue: string) => void;
  // copy variable for update mixload
  zMixLoadSkusOld: string[];
  zSetMixLoadSkusOld: (zMixLoadSkusOld: string[]) => void;
  // fetchData: () => Promise<void>;
  createSkuMasterList: (data: SkuMasterModel) => Promise<void>;
  getAllSkusDetails: (skuNumber: string) => Promise<void>;
  getAllSkusDetailsInquiry: (
    skuNumber: string,
    userEmailAdd: string,
    skuTitle: string
  ) => Promise<void>;
  getAllBuyer: () => Promise<void>;
  getAllSkuNum: (skuNumber: string) => Promise<void>;
  updateSku: (data: SkuMasterModel) => Promise<void>;
  deleteSku: (id: string, skuNumber: string) => Promise<void>;
  isMixedLoadSku: (skuNumber: string) => Promise<any>;
  zSkuEnrollmentAEData: SkuEnrollmentFormValues;
  zSetSkuEnrollmentAEData: (data: SkuEnrollmentFormValues) => void;
  clearSkuEnrollmentAEData: () => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useSkuEnrollmentContext = create<OrderFormState>((set) => ({
  zSkuMasterList: null,
  zSetSkuMasterList: async (zSkuMasterList: SkuMasterModel[]) =>
    set({ zSkuMasterList }),
  zSkuEnrollmentTab: 0,
  zSetSkuEnrollmentTab: (zSkuEnrollmentTab: number) =>
    set({ zSkuEnrollmentTab }),
  zSkuSearchText: "",
  zSetSkuSearchText: (zSkuSearchText: string) => set({ zSkuSearchText }),
  zSkuAddEditTitle: ADD_SKU,
  zSetSkuAddEditTitle: (zSkuAddEditTitle: string) => set({ zSkuAddEditTitle }),
  zSkuDetailsInquiry: null,
  zSetSkuDetailsInquiry: async (zSkuDetailsInquiry: SkuDetailsInquiry) =>
    set({ zSkuDetailsInquiry }),
  zBuyerList: null,
  zSetBuyerList: async (zBuyerList: BuyerModel[]) => set({ zBuyerList }),
  zAllSkuNumList: null,
  zSetAllSkuNumList: async (zAllSkuNumList: GetAllSkuNumModel[]) =>
    set({ zAllSkuNumList }),
  zSkuNumberTF: "",
  zSetSkuNumberTF: (zSkuNumberTF: string) => set({ zSkuNumberTF }),
  zSkuEnrollmentAEData: initialData,
  zSetSkuEnrollmentAEData: (data) => set({ zSkuEnrollmentAEData: data }),
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

  zIsExistInUser: false,
  zSetIsExistInUser: (zIsExistInUser: boolean) => set({ zIsExistInUser }),
  zNAValue: "no",
  zSetNAValue: (zNAValue: string) => set({ zNAValue }),
  zMixLoadPrimaryValue: "yes",
  zSetMixLoadPrimaryValue: (zMixLoadPrimaryValue: string) =>
    set({ zMixLoadPrimaryValue }),
  zMixLoadSkusOld: [],
  zSetMixLoadSkusOld: (zMixLoadSkusOld: string[]) => set({ zMixLoadSkusOld }),
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

  getAllSkusDetails: async (skuNumber: string) => {
    const { zSetLoading, zRoleId, zUserEmailAdd, zSetError } =
      useSharedStore.getState();
    const { zMixLoadPrimaryValue } = useSkuEnrollmentContext.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETSKUDETAILS(
        skuNumber,
        zRoleId,
        zUserEmailAdd
      );
      console.log(
        "response?.data.SkuMasterLists: ",
        response?.data.SkuMasterLists
      );

      let data = response?.data.SkuMasterLists[0];
      let mixLoadSkusArr = data?.MixLoadSkus
        ? (data.MixLoadSkus.split(",") as string[])
        : [];

      set({ zMixLoadSkusOld: mixLoadSkusArr });

      mixLoadSkusArr = mixLoadSkusArr.filter(sku => sku !== skuNumber);
      if (mixLoadSkusArr.length > 0) {
        set({ zMixLoadPrimaryValue: "no" });
      } else {
        set({ zMixLoadPrimaryValue: "yes" });
      }
      // let mixLoadSkusStr = "";

      // mixLoadSkusArr.forEach((item: string, index: number) => {
      //   mixLoadSkusStr += item + ",";
      // });
      // if (mixLoadSkusStr.endsWith(",")) {
      //   mixLoadSkusStr = mixLoadSkusStr.slice(0, -1);
      // }
      if (data != null) {
        const updatedData: SkuEnrollmentFormValues = {
          id: data.Id,
          skuNumber: data.SkuNumber,
          itemDescription: data.ItemDescription,
          vendorCode: data.VendorCode,
          vendorName: data.VendorName,
          foreignVendorName: data.ForeignVendorName,
          foreignVendorCode: data.ForeignVendorCode,
          countryOrigin: data.CountryOrigin,
          itemStatus: data.ItemStatus,
          shelfLifeWeeks: data.ShelfLifeWeeks,
          trigger: Number(formatNumber(data.Trigger)),
          buildTo: data.BuildTo,
          totalOrderLeadTime: data.TotalOrderLeadTime,
          cbmPerCase: data.CbmPerCase,
          totalCbmPerContainer: data.TotalCbmPerContainer,
          tonPerCase: data.TonPerCase,
          poDay: data.PoDay,
          buyer: data.Buyer,
          // orderSpecialist: data.OrderSpecialist,
          unitPerCase: data.UnitPerCase,
          casePerPallet: data.CasePerPallet,
          unitPerPallet: data.UnitPerPallet,
          totalTonPerContainer: data.TotalTonPerContainer,
          noOfPalletsPerContainer: data.NoOfPalletsPerContainer,
          containerStacking: data.ContainerStacking,
          unitsPerContainer: data.UnitsPerContainer,
          containerLoad: data.ContainerLoad,
          containerSize: data.ContainerSize,
          moq: data.Moq,
          mixLoadSkus: mixLoadSkusArr,
        };
        useSkuEnrollmentContext.getState().zSetSkuEnrollmentAEData(updatedData);
      }

      set({ zSkuMasterList: response?.data.SkuMasterLists });
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

  getAllSkusDetailsInquiry: async (
    skuNumber: string,
    userEmailAdd: string,
    skuTitle: string = ""
  ) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETSKUDETAILSINQUIRY(
        skuNumber,
        userEmailAdd
      );
      let data = response?.data;
      if (data != null && skuTitle === ADD_SKU) {
        const updatedData: SkuEnrollmentFormValues = {
          id: data.Id,
          skuNumber: skuNumber,
          itemDescription: data.ITEMDESCRIPTION,
          vendorCode: data.VENDORCODE != null ? data.VENDORCODE.toString() : "",
          vendorName: data.VENDORNAME,
          foreignVendorName: data.FOREIGNVENDORNAME,
          foreignVendorCode:
            data.FOREIGNVENDORCODE != null
              ? data.FOREIGNVENDORCODE.toString()
              : "",
          countryOrigin: data.COUNTRYOFORIGIN,
          itemStatus: data.ITEMSTATUS,
          shelfLifeWeeks: 1,
          trigger: 0,
          buildTo: 0,
          totalOrderLeadTime: 0,
          cbmPerCase: 0,
          totalCbmPerContainer: 0,
          tonPerCase: 0,
          poDay: "",
          buyer: data.BUYERNAME,
          // orderSpecialist: data.OrderSpecialist,
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
        useSkuEnrollmentContext.getState().zSetSkuEnrollmentAEData(updatedData);
      }

      set({
        zSetSkuDetailsInquiry: response?.data,
        zIsExistInUser: data.IsExistInUser,
      });
      zSetLoading(false);
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getAllSkusDetailsInquiry: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getAllBuyer: async () => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETALLBUYER();
      let data = response?.data;
      if (data != null) {
        useSkuEnrollmentContext
          .getState()
          .zSetBuyerList(data.BuyerResponseList);
        console.log("data.BuyerResponseList: ", data.BuyerResponseList);
      }

      console.log("response?.data: ", response?.data);
      zSetLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getAllBuyer: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getAllSkuNum: async (skuNumber: string) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETALLSKUNUM(skuNumber);
      let data = response?.data;
      if (data != null) {
        console.log("data.SkuNumberList: ", data.SkuNumberList);
        useSkuEnrollmentContext
          .getState()
          .zSetAllSkuNumList(data.SkuNumberList);
        // console.log("data.BuyerResponseList: ", data.BuyerResponseList);
      }

      console.log("response?.data: ", response?.data);
      zSetLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getAllSkuNum: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  isMixedLoadSku: async (skuNumber: string) => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.ISMIXEDLOADSKU(skuNumber);

      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching isMixedLoadSku: ${error.message}`);
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

    zSetLoading(true);

    try {
      const response = await APIHelpers.DELETESKU(id, skuNumber);
      console.log("response: ", response?.data);
      // Check for specific error in the response
      if (response?.data.IsSuccess === true) {
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

  clearSkuEnrollmentAEData: async () => {
    set({ zSkuEnrollmentAEData: initialData });
  },
}));

export default useSkuEnrollmentContext;
