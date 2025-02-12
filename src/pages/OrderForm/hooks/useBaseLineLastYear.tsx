import { useState, useCallback } from "react";
import debounce from "lodash/debounce"; // Ensure lodash is installed: npm install lodash
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";

const useBaseLineLastYear = (initialValue: string) => {
  const { zSetBaseLineLastYear } = useOrderFormContext();
  const [baseLineLastYear, setBaseLineLastYear] = useState(0);

  // Function to handle the state update logic
  const updateBaseLineLastYear = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value;

      // Remove any non-numeric characters (no decimal points, no E, no +)
      const filteredValue = value.replace(/[^0-9]/g, "");

      // Only update the state if the value has changed
      if (filteredValue !== value) {
        e.target.value = filteredValue; // Set the input field to the filtered value
      }
      const filteredValueNum = Number.isNaN(parseInt(filteredValue))
        ? 0
        : parseInt(filteredValue);
      setBaseLineLastYear(filteredValueNum); // Update the state with the parsed value (filteredValue);
      // Assuming zSetBaseLineLastYear is available in the scope
      zSetBaseLineLastYear(filteredValueNum);
    },
    [zSetBaseLineLastYear]
  );

  // Debounced version of the update function
  const debouncedBLYOnChange = useCallback(
    debounce(updateBaseLineLastYear, 200), // Debouncing for 200ms
    [updateBaseLineLastYear]
  );

  return { baseLineLastYear, debouncedBLYOnChange };
};

export default useBaseLineLastYear;
