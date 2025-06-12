import React from "react";
import useSkuEnrollmentContext from "../../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const IsPrimaryButton = () => {
  const { zMixLoadPrimaryValue, zSetMixLoadPrimaryValue } =
    useSkuEnrollmentContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    zSetMixLoadPrimaryValue(event.target.value);
  };

  return (
    <FormControl
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <FormLabel
        component="legend"
        sx={{
          marginRight: 2,
          whiteSpace: "nowrap",
          fontSize: "0.75rem", // Small text
          display: "inline-flex",
        }}
      >
        Primary Sku?
      </FormLabel>
      <RadioGroup
        row
        value={zMixLoadPrimaryValue}
        onChange={handleChange}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center", // Ensures radio buttons and labels are aligned
        }}
      >
        <FormControlLabel
          value="yes"
          control={<Radio />}
          label="YES"
          sx={{ alignItems: "center" }}
        />
        <FormControlLabel
          value="no"
          control={<Radio />}
          label="N/A"
          sx={{ alignItems: "center" }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default IsPrimaryButton;
