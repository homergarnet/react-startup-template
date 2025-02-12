import React from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomTableCellProps extends TableCellProps {
  isDefault?: boolean;
}

const CustomTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "isHighlighted",
})<CustomTableCellProps>(({ isDefault }) => ({
  padding: "8px 17px !important",
  fontSize: "14px",
  fontWeight: "900",
  color: isDefault ? "#1C2C5A" : "#ffffff",
  background: "#1C2C5A",
  textAlign: "center",
  position: "sticky",
  top: 0,
  zIndex: 1,
}));

const StyledTableCellHeader: React.FC<CustomTableCellProps> = (props) => {
  return <CustomTableCell {...props} />;
};

export default StyledTableCellHeader;
