import { Box, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import BadgeButton from "./BadgeButton";
import IDayLabelValue from "../Interface/IDayLabelValue";
import useHomeContext from "../../../../store/Home/useHomeContext";
interface Props {}
const DaySelector: React.FC<Props> = () => {
  const {
    zMondayToFriday,
    zSelectDay,
    zSetSelectDay,
    zIsWorksheetStatusChange,
    getMonToFriCount,
    zSetIsWorksheetStatusChange,
  } = useHomeContext.getState();

  const handleDayChange = (
    event: React.SyntheticEvent,
    newSelectedDay: string | null // Can be null if deselected
  ) => {
    if (newSelectedDay) {
      zSetSelectDay(newSelectedDay);
    }
  };

  const badgeValues = [
    {
      Day: "MONDAY",
      DayCount: zMondayToFriday?.Monday,
    },
    {
      Day: "TUESDAY",
      DayCount: zMondayToFriday?.Tuesday,
    },
    {
      Day: "WEDNESDAY",
      DayCount: zMondayToFriday?.Wednesday,
    },
    {
      Day: "THURSDAY",
      DayCount: zMondayToFriday?.Thursday,
    },
    {
      Day: "FRIDAY",
      DayCount: zMondayToFriday?.Friday,
    },
  ] as IDayLabelValue[];

  useEffect(() => {
    if (zIsWorksheetStatusChange === true) {
      getMonToFriCount();
      zSetIsWorksheetStatusChange(false);
    }
  }, [zIsWorksheetStatusChange]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
      <ToggleButtonGroup
        value={zSelectDay}
        exclusive
        onChange={handleDayChange}
        sx={{ gap: 1 }}
        aria-label="Day selector"
      >
        {badgeValues.map((item, index) => (
          <BadgeButton
            key={index}
            value={item.Day}
            selectedDays={zSelectDay}
            badgeValue={item.DayCount}
          />
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default DaySelector;
