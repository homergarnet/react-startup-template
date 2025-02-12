// src/store.ts
import create from "zustand";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { UserModel } from "../../types/usermodel";
import useSharedStore from "../sharedStore";
import * as APIHelpers from "../../utils/helpers/APIHelpers";
import { EmployeeModel } from "../../types/employeemodel";


//for definining of types

interface EnrollmentFormState {
  error: string | null;
  zEmployeeAddEditTitle: string;
  zSetEmployeeAddEditTitle: (zEmployeeAddEditTitle: string) => void;
  zEmployee: EmployeeModel | {};
  zSetEmployee: (zEmployee: EmployeeModel) => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useEnrollmentPeopleContext = create<EnrollmentFormState>((set) => ({
  error: null,
  zEmployeeAddEditTitle: "",
  zSetEmployeeAddEditTitle: (zEmployeeAddEditTitle: string) =>
    set({ zEmployeeAddEditTitle }),
  zEmployee: {},
  zSetEmployee: async (zEmployee: EmployeeModel) => set({ zEmployee }),
}));

export default useEnrollmentPeopleContext;
