import React, { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment, IconButton, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useOrderFormContext from "../../../store/OrderAnalyst/OrderForm/useOrderFormContext";

// Define the type for the props
interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

// Define the styled component outside of the functional component
export const CustomTableSearchField = styled(TextField)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "bold",
  textAlign: "center",
  cursor: "default",
  display: "flex",
  backgroundColor: "white",
  color: "#1C2C5A", // Ensure the color for autofilled input
  "& .MuiOutlinedInput-root": {
    borderRadius: "99px",
    backgroundColor: "white",
    color: "#1C2C5A", // Ensure the color for autofilled input
  },
  "& .MuiInputBase-input": {
    width: "100%",
    backgroundColor: "white",
    color: "#1C2C5A", // Ensure the color for autofilled input
    // Autofill styles
    ":-webkit-autofill": {
      backgroundColor: "white",
      color: "#1C2C5A", // Ensure the color for autofilled input
    },
    ":-internal-autofill-selected": {
      backgroundColor: "white",
      color: "#1C2C5A", // Ensure the color for autofilled input
    },
  },
}));

const StyledTableSearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const {
    zOrderFormSearch,
    zSetOrderFormSearch,
    zIsSaveOrder,
    zSetIsSaveOrder,
    zSetIsTriggerCreateWsData,
    zPrevOrderFormSearch,
    zSetPrevOrderFormSearch,
  } = useOrderFormContext();

  const isFirstKeyDownRef = useRef(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    zSetOrderFormSearch(event.target.value);
    const value = event.target.value.trim();
    if(value !== "" && zOrderFormSearch !== value && !zIsSaveOrder) {
      zSetIsTriggerCreateWsData(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission if inside a form

      if (
        zPrevOrderFormSearch !== "" &&
        zPrevOrderFormSearch !== zOrderFormSearch &&
        !zIsSaveOrder
      ) {
        zSetIsTriggerCreateWsData(true);
      } else {
        onSearch(zOrderFormSearch);
        zSetPrevOrderFormSearch(zOrderFormSearch);
      }
    }
  };

  const handleSearch = () => {
    onSearch(zOrderFormSearch);
  };

  return (
    <>
      <CustomTableSearchField
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        size="small"
        value={zOrderFormSearch}
        onChange={handleInputChange}
        label="Search..."
        onKeyDown={handleKeyDown}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <IconButton
        //         // onClick={handleSearch}
        //         edge="end"
        //       >
        //         <SearchIcon />
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
      />
    </>
  );
};

export default StyledTableSearchBar;
