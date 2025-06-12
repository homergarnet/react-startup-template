import { Box, Typography } from "@mui/material";
import React from "react";
// Define props for IconWithText
interface IconWithTextProps {
  icon: React.ReactNode; // Accepts any valid React node (e.g., icons)
  text1: string;
  text2: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text1, text2 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1, // Space between the icon and text
      }}
    >
      {icon}
      <Typography
        variant="body1"
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        <strong>{text1}</strong> {text2}
      </Typography>
    </Box>
  );
};

export default IconWithText;
