import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { FieldError } from "react-hook-form";

import { DELETE_EMPLOYEE } from "../../../constants/constants";
import useEnrollmentPeopleContext from "../../../store/enrollment-people/useEnrollmentPeopleContext";

interface CustomSelectProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  error?: FieldError | undefined;
  register: any;
  onChange: (event: SelectChangeEvent) => void;
}

const EmployeeSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  error,
  register,
  onChange,
}) => {
  const { zEmployeeAddEditTitle } = useEnrollmentPeopleContext();
  return (
    <FormControl
      fullWidth
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "black", // Removes the red border
        },
      }}
      error={!!error}
    >
      <InputLabel id={`${name}-select-label`} sx={{ top: "-8px" }} shrink>
        {error?.message ? label + "*" : label}
      </InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        value={value || ""}
        {...register(name)}
        label={error?.message ? label + "*" : label}
        onChange={onChange}
        disabled={zEmployeeAddEditTitle === DELETE_EMPLOYEE ? true : false}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default EmployeeSelect;
