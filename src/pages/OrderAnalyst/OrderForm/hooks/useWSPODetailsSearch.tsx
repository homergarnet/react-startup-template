import { useState, useCallback } from "react";
import debounce from "lodash/debounce"; // Ensure lodash is installed: npm install lodash
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import { useNavigate } from "react-router-dom";
import useWSPODetailsContext from "../../../../store/OrderAnalyst/OrderForm/useWSPODetailsContext";
const useWSPODetailsSearch = (initialValue: string) => {
  const {
    zWSPODetailsSearchText,
    zSetWSPODetailsSearchText,
    getWorkSheetPODetails,
  } = useWSPODetailsContext();
  const [wsPODSearchText, setWsPODSearchText] = useState("");
  const navigate = useNavigate();

  // Function to handle the state update logic
  const updateWSPODSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value;
      navigate(`/order-analyst/order-form/worksheet-po-detail?id=${value}`);
      setWsPODSearchText(value); // Update the state with the parsed value (filteredValue);
      // Assuming zSetBaseLineLastYear is available in the scope
      zSetWSPODetailsSearchText(value);
      getWorkSheetPODetails(value);
    },
    [zWSPODetailsSearchText]
  );

  // Debounced version of the update function
  const debouncedWSPODSearchOnChange = useCallback(
    debounce(updateWSPODSearchText, 500), // Debouncing for 200ms
    [updateWSPODSearchText]
  );

  return { wsPODSearchText, debouncedWSPODSearchOnChange };
};

export default useWSPODetailsSearch;
