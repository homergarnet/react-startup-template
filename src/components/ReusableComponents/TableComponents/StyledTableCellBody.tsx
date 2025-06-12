import React from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  height: "30px", // Adjust height as needed
  minWidth: "100px", // Use minWidth instead of fixed width for flexibility
  fontSize: "11px",
  color: "#1C2C5A",
  textAlign: "center",
  padding: "8px", // Adjust padding for better spacing
  "&:hover": {
    backgroundColor: "#E3F2FD",
    cursor: "pointer",
  },
}));

const StyledTableCellBody = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>((props, ref) => {
  return <CustomTableCell ref={ref} {...props} />;
});

export default StyledTableCellBody;
