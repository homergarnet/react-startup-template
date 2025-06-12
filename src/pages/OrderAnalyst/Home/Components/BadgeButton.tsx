import { Box, ToggleButton } from "@mui/material";
import React from "react";

interface Props {
  value: string;
  selectedDays: string;
  badgeValue?: number;
}
const BadgeButton: React.FC<Props> = ({ value, selectedDays, badgeValue }) => {
  const isSelected = selectedDays === value; // Compare full names now
  return (
    <Box sx={{ position: "relative" }}>
      <ToggleButton
        value={value}
        aria-label={value}
        sx={{
          // Prevent button highlighting when clicked
          "&.Mui-selected": {
            backgroundColor: "transparent", // Remove background on selection
            color: "inherit", // Maintain the text color
          },
          "&:hover": {
            backgroundColor: "transparent", // Prevent hover effect
          },
        }}
      >
        {value.charAt(0)} {/* Display only the initial */}
      </ToggleButton>
      {badgeValue !== undefined && badgeValue !== null && badgeValue !== 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "27px",
            height: "27px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {badgeValue}
        </Box>
      )}
    </Box>
  );
};

export default BadgeButton;
