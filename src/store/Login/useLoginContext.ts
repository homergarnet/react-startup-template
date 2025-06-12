// src/store.ts
import create from "zustand";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { UserModel } from "../../types/usermodel";
import useSharedStore from "../sharedStore";
import * as APIHelpers from "../../utils/helpers/APIHelpers";
import { isAuthenticated } from "../../utils/tokenhelpers";
import { ERR_UNEXPECTED_ERROR_MESSAGE } from "../../constants/constants";

//for definining of types

interface LoginFormState {
  zUserList: UserModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zIsAuthenticated: boolean | null;
  zSetIsAuthenticated: (zIsAuthenticated: boolean) => void;
  zJwtToken: string | null;
  zSetJwtToken: (zIsAuthenticated: string) => void;
  zDateModified: string | null;
  zSetDateModified: (zDateModified: string) => void;
  getUserByUsername: (username: string) => Promise<any>;
  loginReq: (username: string, password: string) => Promise<any>;
  getDateModAsaDimCalendarWorksheet: () => Promise<any>;
  getJobStatusResult: () => Promise<any>;
}

//for inialization
// Create the Zustand store with type annotations
const useLoginContext = create<LoginFormState>((set) => ({
  zUserList: null,
  zJwtToken: localStorage.getItem("authToken"),
  zSetJwtToken: (zJwtToken: string) => set({ zJwtToken }),
  zIsAuthenticated: isAuthenticated(),
  zSetIsAuthenticated: (zIsAuthenticated: boolean) => set({ zIsAuthenticated }),
  zDateModified: null,
  zSetDateModified: (zDateModified: string) => set({ zDateModified }),
  getUserByUsername: async (username: string): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETUSERBYUSERNAME(username);
      console.log("response: ", response?.data);
      set({ zUserList: response?.data.Users });
      zSetLoading(false);
      if (response?.data.Users.length > 0) {
        return "true " + response?.data.Users[0].Profile;
      } else {
        return false;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getUserByUsername: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  loginReq: async (username: string, password: string): Promise<any> => {
    const { zSetLoading, zSetUserEmailAdd, zSetRoleId, zSetError } =
      useSharedStore.getState();
    zSetLoading(true);
    const loginInfo = { UserEmailAdd: username, Password: password };
    try {
      const response = await APIHelpers.LOGIN(loginInfo);
      window.localStorage.setItem(
        "userEmailAdd",
        response?.data.Users[0] && response?.data.Users[0].UserEmailAdd
      );
      zSetUserEmailAdd(
        response?.data.Users[0] && response?.data.Users[0].UserEmailAdd
      );
      zSetRoleId(response?.data.Users[0] && response?.data.Users[0].Profile);
      window.localStorage.setItem(
        "roleId",
        response?.data.Users[0] && response?.data.Users[0].Profile
      );
      window.localStorage.setItem(
        "authToken",
        response?.data.Token && response?.data.Token
      );
      // window.localStorage.setItem("Id", `8c7fb71e-4a1c-496e-c568-08dcd13de5ba`);
      // window.localStorage.setItem("userName", `880`);
      // window.localStorage.setItem("club", `880`);
      set({ zIsAuthenticated: response?.data.ErrorMessage === "" });
      zSetLoading(false);
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching loginReq: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getDateModAsaDimCalendarWorksheet: async (): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETDATEMODASADIMCALENDARWORKSHEET();
      set({ zDateModified: response?.data.DateModified });
      zSetLoading(false);
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(
          `Error fetching getDateModAsaDimCalendarWorksheet: ${error.message}`
        );
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },

  getJobStatusResult: async (): Promise<any> => {
    const { zSetLoading, zSetError } = useSharedStore.getState();
    zSetLoading(true);

    try {
      const response = await APIHelpers.GETJOBSTATUSRESULT();
      set({ zDateModified: response?.data.DateModified });
      zSetLoading(false);
      return response?.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        zSetError(`Error fetching getJobStatusResult: ${error.message}`);
      } else {
        zSetError(`${ERR_UNEXPECTED_ERROR_MESSAGE}`);
      }
    } finally {
      zSetLoading(false);
    }
  },
}));

export default useLoginContext;
