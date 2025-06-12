import { useEffect } from "react";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";

const useConfirmBeforeExit = () => {
  const { zIsSaveOrder } = useOrderFormContext();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // if (!zIsSaveOrder) {
        event.returnValue = "Are you sure you want to leave?";
      // }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};


export default useConfirmBeforeExit;