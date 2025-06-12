import React, { useState, useEffect } from "react";
import { Box, TextField, FormHelperText } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface DateRangePickerProps {
  startLabel?: string;
  endLabel?: string;
  defaultRange?: DateRange;
  onChange?: (range: DateRange, formatted: string) => void;
  error?: boolean;
  helperText?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startLabel = "Start Date",
  endLabel = "End Date",
  defaultRange = { startDate: null, endDate: null },
  onChange,
  error = false,
  helperText = "",
}) => {
  const [range, setRange] = useState<DateRange>({
    startDate: defaultRange.startDate ? dayjs(defaultRange.startDate) : null,
    endDate: defaultRange.endDate ? dayjs(defaultRange.endDate) : null,
  });
  const [validationError, setValidationError] = useState<string>("");

  // Validate that end date is not before start date
  useEffect(() => {
    if (range.startDate && range.endDate && range.endDate.isBefore(range.startDate)) {
      setValidationError("End date must be after start date");
    } else {
      setValidationError("");
    }

    // Trigger onChange callback with formatted string
    if (onChange && range.startDate && range.endDate && !validationError) {
      const formatted = `${range.startDate.format("MMM D")} – ${range.endDate.format("MMM D, YYYY")}`;
      onChange(range, formatted);
    }
  }, [range, onChange, validationError]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start",mb: 2, mt: 2 }}>
        <DatePicker
          label={startLabel}
          value={range.startDate}
          onChange={(newValue: Dayjs | null) =>
            setRange((prev) => ({ ...prev, startDate: newValue }))
          }
          inputFormat="MMM D, YYYY"
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ flex: 1 }}
              error={error || !!validationError}
            />
          )}
        />
        <DatePicker
          label={endLabel}
          value={range.endDate}
          onChange={(newValue: Dayjs | null) =>
            setRange((prev) => ({ ...prev, endDate: newValue }))
          }
          inputFormat="MMM D, YYYY"
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ flex: 1 }}
              error={error || !!validationError}
            />
          )}
        />
      </Box>
      {(error || validationError) && (
        <FormHelperText sx={{ color: "error.main", mt: 1 }}>
          {validationError || helperText}
        </FormHelperText>
      )}
    </LocalizationProvider>
  );
};

export default DateRangePicker;