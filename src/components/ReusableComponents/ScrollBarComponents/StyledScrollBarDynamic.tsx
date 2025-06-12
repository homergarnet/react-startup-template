import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

// Define a type for the additional props
interface CustomScrollBoxProps extends BoxProps {
  dynamicHeight?: string;
  transitionDuration?: string; // Added for conditional transition
}

const CustomScrollBox = styled(Box)<CustomScrollBoxProps>(({ dynamicHeight, transitionDuration }) => ({
  overflowY: 'auto',
  height: dynamicHeight || 'calc(100vh - 190px)', // Use dynamicHeight prop or fallback to default

  /* Conditional Transition for smooth height change */
  transition: `height ${transitionDuration || '0s'} ease-in-out`, // Apply transition if duration is provided

  /* Custom Scrollbar Styles */
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#2b4b81',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));

const StyledScrollBoxDynamic: React.FC<CustomScrollBoxProps> = (props) => {
  return <CustomScrollBox {...props} />;
};

export default StyledScrollBoxDynamic;
