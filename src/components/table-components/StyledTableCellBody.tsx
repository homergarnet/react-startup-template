import React from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTableCell = styled(TableCell)(() => ({
  height: "30px !important", // Adjust height as needed
  width: "100px !important", // Set a fixed width or adjust as necessary
  fontSize: "11px",
  color: "#1C2C5A",
  justifyContent: "center",
  textAlign: "center",
  padding: "8px", // Adjust padding for better spacing
  "&:hover": {
    backgroundColor: "#E3F2FD",
    cursor: "pointer",
  },

  // MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input
}));

const StyledTableCellBody: React.FC<TableCellProps> = (props) => {
  return <CustomTableCell {...props} />;
};

export default StyledTableCellBody;
