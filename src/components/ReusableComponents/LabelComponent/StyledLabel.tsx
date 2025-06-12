import React from "react";
import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomTypographyProps extends TypographyProps {
  isDefault?: boolean;
}

const CustomLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isDefault",
})<CustomTypographyProps>(({ isDefault }) => ({
  textTransform: "none",
  fontSize: "10.5px",
  fontWeight: "bold",
  color: isDefault ? "#ffffff" : "#1C2C5A",
  textAlign: isDefault ? "center" : "left",
}));

const StyledLabel: React.FC<CustomTypographyProps> = (props) => {
  return <CustomLabel {...props} />;
};

export default StyledLabel;
