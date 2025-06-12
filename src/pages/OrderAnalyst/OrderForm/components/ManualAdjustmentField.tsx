import React, { forwardRef } from "react";
import StyledTableCellTextField from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellTextField";
interface ReusableInputProps {
  value: number | string; // Current value of the input
  index: number; // Index of the input in the loop
  weekNo: string; // Associated week number
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    weekNo: string,
    index: number
  ) => void; // Change handler
  disabled: boolean;
}

const ManualAdjustmentField = forwardRef<HTMLInputElement, ReusableInputProps>(
  ({ value, index, weekNo, onChange, disabled }, ref) => (
    <StyledTableCellTextField
      type="text"
      defaultValue={value} // Initial value of the input
      ref={ref} // Ref passed from the parent
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e, weekNo, index)
      }
      disabled={disabled}
    />
    // <input
    //   type="text"
    //   defaultValue={value} // Initial value of the input
    //   ref={ref} // Ref passed from the parent
    //   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //     onChange(e, weekNo, index)
    //   }
    // />
  )
);

export default ManualAdjustmentField;
