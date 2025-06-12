import React, { useEffect } from "react";
import useBaseLineLastYear from "../hooks/useBaseLineLastYear";
import StyledTextField from "../../../../Components/ReusableComponents/TextFieldComponents/StyledTextField";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
interface Props {
  type: string;
  label: string;
}
const BLLYField: React.FC<Props> = ({ type, label }) => {
  const {
    inputValue,
    setInputValue,
    handleInputChange,
    handleKeyDown,
    resetBaseLineLastYear,
  } = useBaseLineLastYear("0");

  const {
    zIsClearLYTYBaseLine,
    zSetIsClearLYTYBaseLine,
    zBaseLineLastYear,
    zSetBaseLineLastYear,
    zBaseLineLastYearCache,
    zSetBaseLineLastYearCache,
    zIsOriginalClick,
  } = useOrderFormContext();

  useEffect(() => {
    if (zIsClearLYTYBaseLine) {
      resetBaseLineLastYear();
      zSetIsClearLYTYBaseLine(false);
    }
  }, [zIsClearLYTYBaseLine]);

  //logic for removing and restoring base line last year
  useEffect(() => {
    if (zIsOriginalClick) {
      zSetBaseLineLastYearCache(zBaseLineLastYear);
      zSetBaseLineLastYear(0);
      resetBaseLineLastYear();
    } else {
      zSetBaseLineLastYear(zBaseLineLastYearCache);
      setInputValue(zBaseLineLastYearCache.toString());
    }
  }, [zIsOriginalClick]);

  //always save the inputted value
  useEffect(() => {
    if (!zIsOriginalClick) {
      zSetBaseLineLastYearCache(zBaseLineLastYear);
    }
  }, [inputValue]);

  return (
    <StyledTextField
      id="outlined-number"
      type={type}
      label={label}
      InputLabelProps={{ shrink: true }}
      value={inputValue} // Bind to intermediate state
      onChange={handleInputChange} // Update intermediate state
      onKeyDown={handleKeyDown}
    />
  );
};

export default BLLYField;
