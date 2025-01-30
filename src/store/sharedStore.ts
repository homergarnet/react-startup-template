import create from "zustand";

interface SharedState {
    zLoading: boolean;
    zSetLoading: (zLoading: boolean) => void;
    zUserEmailAdd: string;
    zSetUserEmailAdd: (zUserEmailAdd: string) => void;
    zRoleId: string;
    zSetRoleId: (zRoleId: string) => void;
    zIsDrawerOpen: boolean;
    zSetIsDrawerOpen: (zIsDrawerOpen: boolean) => void;
}

const useSharedStore = create<SharedState>((set) => ({
    zLoading: false,
    zSetLoading: (zLoading) => set({ zLoading }),
    zUserEmailAdd: "",
    zSetUserEmailAdd: (zUserEmailAdd) => set({ zUserEmailAdd }),
    zRoleId: "",
    zSetRoleId: (zRoleId) => set({ zRoleId }),
    zIsDrawerOpen: true,
    zSetIsDrawerOpen: (zIsDrawerOpen) => set({ zIsDrawerOpen }),
}));

export default useSharedStore;