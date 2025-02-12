import React, { useState } from "react";
import { TextField, styled } from "@mui/material";

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
