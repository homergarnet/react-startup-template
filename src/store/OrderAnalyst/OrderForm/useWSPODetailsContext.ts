// src/store.ts
import { create } from "zustand";
import { AxiosError } from "axios";
import { SkuMasterModel } from "../../../types/skumastermodel";
import * as APIHelpers from "../../../utils/helpers/APIHelpers";
import useSharedStore from "../../sharedStore";
import { WorkSheetPODModel } from "../../../types/workSheetPODetails";

//for definining of types
interface WorkSheetPODetailsState {
    zWSPODList: WorkSheetPODModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
    zSetWSPODList: (zWSPODList: WorkSheetPODModel[]) => Promise<void>;
    error: string | null;
    zWSPODetailsSearchText: string;
    zSetWSPODetailsSearchText: (zWSPODetailsSearchText: string) => void;
    getWorkSheetPODetails: (poNumber: string) => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useWSPODetailsContext = create<WorkSheetPODetailsState>((set) => ({

    zWSPODList: null,
    zSetWSPODList: async (zWSPODList: WorkSheetPODModel[]) => set({ zWSPODList }),
    error: null,
    zWSPODetailsSearchText: "",
    zSetWSPODetailsSearchText: (zWSPODetailsSearchText: string) => set({ zWSPODetailsSearchText }),
    getWorkSheetPODetails: async (poNumber: string) => {

        const { zSetLoading } = useSharedStore.getState();
        zSetLoading(true);

        try {

            const response = await APIHelpers.GETWORKSHEETPODETAILS(poNumber);
            set({ zWSPODList: response?.data });
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

}));

export default useWSPODetailsContext;