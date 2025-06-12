import React from 'react';
import { TextField, TextFieldProps, InputBaseProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styles for the input element
const StyledInput = styled('input')({
  height: "10px !important",   // Adjust height as needed
  width: "100%",   // Set a fixed width or adjust as necessary
    
  fontSize: "11px",
  color: '#1C2C5A',
  textAlign: 'center',
  justifyContent: 'center', // Center horizontally
  alignItems: 'center !important',     // Center vertically
});

// Custom styles for the TextField itself
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    // Adjust padding here
    padding: '0px',
    // If you need to change padding only on certain sides
    paddingLeft: '0px', // Example for left padding
    paddingRight: '0px', // Example for right padding
  },
  '& .MuiInputBase-input': {
    // Set padding to zero for the input element itself
    padding: '8px',
    fontSize: '11px',
    color: '#1C2C5A',
  },
}));

const StyledTableCellTextField: React.FC<TextFieldProps> = (props) => {
  return <CustomTextField {...props} InputProps={{ inputComponent: StyledInput }} />;
};

export default StyledTableCellTextField;
