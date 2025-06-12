import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomScrollBox = styled(Box)`
  overflow-y: auto;
  height: calc(100vh - 190px);

  /* Custom Scrollbar Styles */
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2b4b81;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  position: relative;
  padding-top: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: none;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledScrollBox: React.FC<BoxProps> = (props) => {
  return <CustomScrollBox {...props} />;
};

export default StyledScrollBox;
