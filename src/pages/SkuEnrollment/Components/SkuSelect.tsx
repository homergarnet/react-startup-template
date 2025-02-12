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
import { DELETE_SKU, UPDATE_SKU } from "../../../../constants/constants";
import useSkuEnrollmentContext from "../../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";

interface CustomSelectProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  error?: FieldError | undefined;
  register: any;
  onChange: (event: SelectChangeEvent) => void;
}

const SkuSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  error,
  register,
  onChange,
}) => {

  const { zSkuAddEditTitle } =
  useSkuEnrollmentContext();
  return (
    <FormControl fullWidth margin="normal" error={!!error}>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        value={value || ""}
        {...register(name)}
        label={label}
        onChange={onChange}
        disabled={zSkuAddEditTitle === DELETE_SKU ? true : false}
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

export default SkuSelect;
