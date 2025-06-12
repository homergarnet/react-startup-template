import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce"; // Ensure lodash is installed: npm install lodash
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import { formatNumber } from "../../../../utils/formatNumber";

const useBaseLineLastYear = (initialValue: string) => {
  const {
    zBaseLineLastYear,
    zSetBaseLineLastYear,
    zWorksheetHistory,
    zSetIsFirstLoad,
    zSetIsSaveOrder,
    zCurrentWeekHighlight,
    zIsOriginalClick,
  } = useOrderFormContext();

  const [inputValue, setInputValue] = useState(initialValue);

  // Debounced update function
  const updateBaseLineLastYear = useCallback(
    debounce((value: string) => {
      const filteredValue = value.replace(/[^0-9]/g, "");
      const filteredValueNum = Number(filteredValue) || 0;
      zSetBaseLineLastYear(filteredValueNum);
      if (zCurrentWeekHighlight !== "") {
        zSetIsSaveOrder(false);
      }
    }, 1500),
    [zSetBaseLineLastYear]
  );

  // Immediate input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "");
      // console.log("rawValue: ", rawValue);

      // Convert to number
      const numericValue = rawValue === "" ? 0 : Number(rawValue);
      // Ensure a valid number before setting state
      if (!isNaN(numericValue) && numericValue >= 0) {
        // console.log("nag if");
        setInputValue(formatNumber(numericValue)); // Update the input field immediately
        zSetIsFirstLoad(false);
        // updateBaseLineLastYear(numericValue.toString()); // Trigger debounced update
      } else {
        // console.log("nag else");
        setInputValue(zBaseLineLastYear.toString());
        // updateBaseLineLastYear(zBaseLineLastYear.toString()); // Trigger debounced update
      }
    },
    [updateBaseLineLastYear]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const target = e.target as HTMLInputElement;
        const rawValue = target.value.replace(/\D/g, "");
        console.log("tinawag");
        // Convert to number
        const numericValue = rawValue === "" ? 0 : Number(rawValue);

        updateBaseLineLastYear(numericValue.toString()); // Trigger debounced update
      }
    },
    [updateBaseLineLastYear]
  );

  // Reset function
  const resetBaseLineLastYear = useCallback(() => {
    setInputValue(initialValue); // Reset to the initial value, not ""
  }, [initialValue]);

  useEffect(() => {
    if (zWorksheetHistory && zWorksheetHistory[0]?.BaseLineLY) {
      setInputValue(
        zIsOriginalClick === false
          ? formatNumber(zWorksheetHistory[0]?.BaseLineLY.toString())
          : ""
      );
    }
  }, [zWorksheetHistory, zIsOriginalClick]);

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    handleKeyDown,
    resetBaseLineLastYear,
  };
};

export default useBaseLineLastYear;
