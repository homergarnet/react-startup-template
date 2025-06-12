import { useState, useCallback } from "react";
import debounce from "lodash/debounce"; // Ensure lodash is installed: npm install lodash
import useSkuEnrollmentContext from "../../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";

const useSkuNumberTF = (initialValue: string) => {
  const { zSetSkuNumberTF } = useSkuEnrollmentContext();
  const [skuNumberText, setSkuNumberText] = useState("");

  // Function to handle the state update logic
  const updateSkuNumberText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e?.target?.value != null
          ? Number(e?.target?.value.replace(/,/g, ""))
          : 0;
      setSkuNumberText(value.toString()); // Update the state with the parsed value (filteredValue);
      // Assuming zSetBaseLineLastYear is available in the scope
      zSetSkuNumberTF(value.toString());
    },
    [zSetSkuNumberTF] // Dependencies of the callback
  );

  // Debounced version of the update function
  const debouncedSkuNumberOnChange = useCallback(
    debounce(updateSkuNumberText, 2500), // Debouncing for 200ms
    [updateSkuNumberText]
  );

  return { skuNumberText, debouncedSkuNumberOnChange };
};

export default useSkuNumberTF;
