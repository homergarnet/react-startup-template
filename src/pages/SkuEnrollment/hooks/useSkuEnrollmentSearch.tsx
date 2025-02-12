import { useState, useCallback } from "react";
import debounce from "lodash/debounce"; // Ensure lodash is installed: npm install lodash
import useSkuEnrollmentContext from "../../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";

const useSkuEnrollmentSearch = (initialValue: string) => {
  const { zSetSkuSearchText } = useSkuEnrollmentContext();
  const [skuSearchText, setSkuSearchText] = useState("");

  // Function to handle the state update logic
  const updateSkuSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value;

      setSkuSearchText(value); // Update the state with the parsed value (filteredValue);
      // Assuming zSetBaseLineLastYear is available in the scope
      zSetSkuSearchText(value);
    },
    [zSetSkuSearchText] // Dependencies of the callback
  );

  // Debounced version of the update function
  const debouncedSkuSearchOnChange = useCallback(
    debounce(updateSkuSearchText, 200), // Debouncing for 200ms
    [updateSkuSearchText]
  );

  return { skuSearchText, debouncedSkuSearchOnChange };
};

export default useSkuEnrollmentSearch;
