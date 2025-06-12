import { useEffect, useState } from "react";
import { formatNumber } from "../../../../utils/formatNumber";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Props {
  index: number;
  value: string | number;
  label?: string;
  type?: string;
  moq: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DTblDataTextField: React.FC<Props> = ({
  index,
  value,
  label = "",
  type = "text",
  moq,
  onChange,
  onKeyDown,
}) => {
  const [inputValue, setInputValue] = useState(formatNumber(value) as string);

  // Keep local state in sync with parent prop
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const increment = () => {
    const noCommaTValue = inputValue.replace(/,/g, "");
    const num = parseFloat(noCommaTValue);
    if (!isNaN(num)) {
      const newVal = num + moq;
      setInputValue(formatNumber(newVal));
    }
  };

  const decrement = () => {
    const noCommaTValue = inputValue.replace(/,/g, "");
    const num = parseFloat(noCommaTValue);
    if (!isNaN(num)) {
      const newVal = num - moq;
      setInputValue(formatNumber(newVal));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(e.target.value);
    // onChange(e); // notify parent

    // Remove all non-numeric characters (keep only numbers)

    // console.log("after fetch");
    const rawValue = e.target.value.replace(/(?!^-)\D/g, "");
    // console.log("rawValue: ", rawValue, "SKU:", skuNumber);

    // Convert to number
    const numericValue = rawValue === "" ? 0 : Number(rawValue);

    // Ensure a valid number before setting state
    if (!isNaN(numericValue)) {
      console.log("entered");
      setInputValue(formatNumber(numericValue));
      onChange(e); // notify parent
    } else {
      console.log("not entered");
      setInputValue(rawValue);
      onChange(e); // notify parent
    }
  };

  return (
    <TextField
      key={index}
      type={type}
      value={inputValue}
      label={label}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // centers vertically
                alignItems: "center",
                height: "100%",
              }}
            >
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  //purpose of this code is to remove the focus from the icon button so enter will not trigger
                  const active = document.activeElement;
                  if (active instanceof HTMLElement) {
                    active.blur();
                  }
                  increment();
                }}
                sx={{ padding: "1px" }}
              >
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  //purpose of this code is to remove the focus from the icon button so enter will not trigger
                  const active = document.activeElement;
                  if (active instanceof HTMLElement) {
                    active.blur();
                  }
                  decrement();
                }}
                sx={{ padding: "1px" }}
              >
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </Box>
          </InputAdornment>
        ),
        sx: {
          "& input": {
            paddingRight: "36px", // ensure room for spinner
          },
        },
      }}
    />
  );
};

export default DTblDataTextField;
