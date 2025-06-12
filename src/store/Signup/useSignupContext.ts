// src/store.ts
import create from "zustand";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { UserModel } from "../../types/usermodel";
import useSharedStore from "../sharedStore";
import * as APIHelpers from "../../utils/helpers/APIHelpers";
import IUserSignup from "../../Pages/_Auth/Interface/IUserSignup";
import { ERR_UNEXPECTED_ERROR_MESSAGE } from "../../constants/constants";

//for definining of types

interface SignupFormState {
  createUser: (data: IUserSignup) => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useSignupContext = create<SignupFormState>((set) => ({
  createUser: async (data: IUserSignup): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();

    zSetLoading(true); // Start loading

    try {
      const response = await APIHelpers.CREATEUSER(data);

      // Check for specific error in the response
      if (response?.data.ErrorMessage === "User already exists!") {
        zSetLoading(false);
        return response?.data.ErrorMessage; // Return the error message as a string
      } else {
        zSetLoading(false);
        return "Signup successfully"; // Return success message
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching createUser: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },
}));

export default useSignupContext;
