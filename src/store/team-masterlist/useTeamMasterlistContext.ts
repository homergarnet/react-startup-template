// src/store.ts
import create from "zustand";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { UserModel } from "../../types/usermodel";
import useSharedStore from "../sharedStore";
import * as APIHelpers from "../../utils/helpers/APIHelpers";
import { EmployeeModel } from "../../types/employeemodel";
import { TeamMasterlistModel } from "../../types/teammasterlistmodel";

//for definining of types

interface TeamMasterlistFormState {
  error: string | null;
  zTeamSearchText: string;
  zSetTeamSearchText: (zTeamSearchText: string) => void;
  zMasterlistTab: number;
  zSetMasterlistTab: (zMasterlistTab: number) => void;
  zTeamMasterlistList: TeamMasterlistModel[] | null; // You can replace `any` with a more specific type (e.g., `Post[]`) if you know the structure of the data
  zSetTeamMasterlistList: (
    zTeamMasterlistList: TeamMasterlistModel[]
  ) => Promise<void>;
  zTMGBTeamNameList: TeamMasterlistModel[] | null;
  zSetTMGBTeamNameList: (
    zTMGBTeamNameList: TeamMasterlistModel[]
  ) => Promise<void>;
  zTMGBShiftList: TeamMasterlistModel[] | null;
  zSetTMGBShiftList: (zTMGBShiftList: TeamMasterlistModel[]) => Promise<void>;
}

//for inialization
// Create the Zustand store with type annotations
const useTeamMasterlistContext = create<TeamMasterlistFormState>((set) => ({
  error: null,
  zTeamSearchText: "",
  zSetTeamSearchText: (zTeamSearchText: string) => set({ zTeamSearchText }),
  zMasterlistTab: 0,
  zSetMasterlistTab: (zMasterlistTab: number) => set({ zMasterlistTab }),
  zTeamMasterlistList: null,
  zSetTeamMasterlistList: async (zTeamMasterlistList: TeamMasterlistModel[]) =>
    set({ zTeamMasterlistList }),
  zTMGBTeamNameList: null,
  zSetTMGBTeamNameList: async (zTMGBTeamNameList: TeamMasterlistModel[]) =>
    set({ zTMGBTeamNameList }),
  zTMGBShiftList: null,
  zSetTMGBShiftList: async (zTMGBShiftList: TeamMasterlistModel[]) =>
    set({ zTMGBShiftList }),
}));

export default useTeamMasterlistContext;
