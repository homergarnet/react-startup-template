// src/store.ts
import create from "zustand";

import { isAuthenticated } from "../../utils/tokenhelpers";

//for definining of types

interface LoginFormState {
  zIsAuthenticated: boolean | null;
  zSetIsAuthenticated: (zIsAuthenticated: boolean) => void;
}

//for inialization
// Create the Zustand store with type annotations
const useLoginContext = create<LoginFormState>((set) => ({
  zIsAuthenticated: isAuthenticated(),
  zSetIsAuthenticated: (zIsAuthenticated: boolean) => set({ zIsAuthenticated }),
}));

export default useLoginContext;
