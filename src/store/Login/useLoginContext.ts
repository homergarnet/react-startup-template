// src/store.ts
import create from "zustand";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { UserModel } from "../../types/usermodel";
import useSharedStore from "../sharedStore";
import * as APIHelpers from "../../utils/helpers/APIHelpers";

//for definining of types

interface LoginFormState {
    zUserList: UserModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
    error: string | null;
    zIsAuthenticated: boolean | null;
    zSetIsAuthenticated: (zIsAuthenticated: boolean) => void;
    getUserByUsername: (username: string) => Promise<any>;
    loginReq: (username: string, password: string) => Promise<any>;
}

//for inialization
// Create the Zustand store with type annotations
const useLoginContext = create<LoginFormState>((set) => ({
    zUserList: null,
    error: null,
    zIsAuthenticated: false,
    zSetIsAuthenticated: (zIsAuthenticated: boolean) => set({ zIsAuthenticated }),
    getUserByUsername: async (username: string): Promise<any> => {

        const { zSetLoading } = useSharedStore.getState();
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

    loginReq: async (username: string, password: string): Promise<any> => {

        const { zSetLoading, zSetUserEmailAdd, zSetRoleId } = useSharedStore.getState();
        zSetLoading(true);
        const loginInfo = { UserEmailAdd: username, Password: password };
        try {

            const response = await APIHelpers.LOGIN(loginInfo);
            window.localStorage.setItem("userEmailAdd", response?.data.Users[0] && response?.data.Users[0].UserEmailAdd);
            zSetUserEmailAdd(response?.data.Users[0] && response?.data.Users[0].UserEmailAdd);
            zSetRoleId(response?.data.Users[0] && response?.data.Users[0].Profile);
            window.localStorage.setItem("roleId", response?.data.Users[0] && response?.data.Users[0].Profile);
            window.localStorage.setItem("token", response?.data.Token && response?.data.Token);
            // window.localStorage.setItem("Id", `8c7fb71e-4a1c-496e-c568-08dcd13de5ba`);
            // window.localStorage.setItem("userName", `880`);
            // window.localStorage.setItem("club", `880`);
            set({ zIsAuthenticated: response?.data.ErrorMessage === "" });
            zSetLoading(false);
            return response?.data;

        } catch (error: unknown) {

            // Type the error as `unknown` to handle it safely
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

export default useLoginContext;