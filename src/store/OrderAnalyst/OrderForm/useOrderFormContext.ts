// src/store.ts
import {create} from "zustand";
import axios, { AxiosError } from "axios";
import useSharedStore from "../../sharedStore";

// Define types for the store state
interface OrderFormState {
  data: any | null;  // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  error: string | null;
  zOrderFormSearch: string;
  zSetOrderFormSearch: (zOrderFormSearch: string) => void;
  zBaseLineLastYear: number;
  zBaseLineThisYear: number;
  zSetBaseLineLastYear: (zBaseLineLastYear: number) => void;  // Add the setter function types
  zSetBaseLineThisYear: (zBaseLineThisYear: number) => void;  // Add the setter function types
  fetchData: () => Promise<void>;
}

// Create the Zustand store with type annotations
const useOrderFormContext = create<OrderFormState>((set) => ({


  data: null,
  error: null,
  zOrderFormSearch: "",
  zSetOrderFormSearch: (zOrderFormSearch: string) => set({ zOrderFormSearch }),
  zBaseLineLastYear: 0,
  zBaseLineThisYear: 0,
  zSetBaseLineLastYear: (zBaseLineLastYear: number) => set({ zBaseLineLastYear }),
  zSetBaseLineThisYear: (zBaseLineThisYear: number) => set({ zBaseLineThisYear }),

  fetchData: async () => {
    const { zSetLoading } = useSharedStore.getState();
    zSetLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      set({ data: response.data, error: null });
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

export default useOrderFormContext;