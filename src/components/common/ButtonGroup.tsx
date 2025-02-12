import { Box, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import BadgeButton from "./BadgeButton";

const ButtonGroup = () => {
  const [selectedDays, setSelectedDays] = useState(["M", "T"]); // Default selected days

  const handleDayChange = (
    event: React.SyntheticEvent,
    newSelectedDays: string[]
  ) => {
    setSelectedDays(newSelectedDays);
  };

  const badgeValues = {
    M: 6,
    T: 1,
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
      <ToggleButtonGroup
        value={selectedDays}
        onChange={handleDayChange}
        sx={{ gap: 1 }}
        aria-label="Day selector"
      >
        <BadgeButton
          value="M"
          selectedDays={selectedDays}
          badgeValue={badgeValues["M"]}
        />
        <BadgeButton
          value="T"
          selectedDays={selectedDays}
          badgeValue={badgeValues["T"]}
        />
        <BadgeButton value="W" selectedDays={selectedDays} />
        <BadgeButton value="Th" selectedDays={selectedDays} />
        <BadgeButton value="F" selectedDays={selectedDays} />
      </ToggleButtonGroup>
    </Box>
  );
};

export default ButtonGroup;
