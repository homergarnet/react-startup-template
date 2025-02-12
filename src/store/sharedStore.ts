import { create } from "zustand";

interface SharedState {
    zLoading: boolean;
    zSetLoading: (zLoading: boolean) => void;
}

const useSharedStore = create<SharedState>((set) => ({
    zLoading: false,
    zSetLoading: (zLoading) => set({ zLoading }),
}));

export default useSharedStore;