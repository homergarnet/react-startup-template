import React, { useEffect } from "react";
import StyledTextField from "../../../../Components/ReusableComponents/TextFieldComponents/StyledTextField";
import useBaseLineThisYear from "../hooks/useBaseLineThisYear";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
interface Props {
  type: string;
  label: string;
}
const BLTYField: React.FC<Props> = ({ type, label }) => {
  const {
    inputValue,
    setInputValue,
    handleInputChange,
    handleKeyDown,
    resetBaseLineThisYear,
  } = useBaseLineThisYear("0");
  const {
    zIsClearLYTYBaseLine,
    zSetIsClearLYTYBaseLine,
    zBaseLineThisYear,
    zSetBaseLineThisYear,
    zBaseLineThisYearCache,
    zSetBaseLineThisYearCache,
    zIsOriginalClick,
  } = useOrderFormContext();

  useEffect(() => {
    if (zIsClearLYTYBaseLine) {
      resetBaseLineThisYear();
      zSetIsClearLYTYBaseLine(false);
    }
  }, [zIsClearLYTYBaseLine]);

  //logic for removing and restoring base line this year
  useEffect(() => {
    console.log("removing");
    if (zIsOriginalClick) {
      zSetBaseLineThisYearCache(zBaseLineThisYear);
      zSetBaseLineThisYear(0);
      resetBaseLineThisYear();
    } else {
      zSetBaseLineThisYear(zBaseLineThisYearCache);
      setInputValue(zBaseLineThisYearCache.toString());
    }
  }, [zIsOriginalClick]);

  //always save the inputted value
  useEffect(() => {
    if (!zIsOriginalClick) {
      zSetBaseLineThisYearCache(zBaseLineThisYear);
    }
  }, [inputValue]);

  return (
    <StyledTextField
      id="outlined-number"
      type={type}
      label={label}
      InputLabelProps={{ shrink: true }}
      value={inputValue} // Bind to intermediate state
      onChange={handleInputChange}
      onKeyDown={handleKeyDown} // Update intermediate state
    />
  );
};

export default BLTYField;
