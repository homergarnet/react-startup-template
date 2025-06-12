import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(() => ({
  fontSize: '10px',
  width: '100%',
  '& .MuiInputBase-input': {
    // Set padding to zero for the input element itself
    padding: '12px',
    fontSize: '11px',
    color: '#1C2C5A',
  },
}))

const StyledTextField: React.FC<TextFieldProps> = (props) => {
  return <CustomTextField {...props} />;
};

export default StyledTextField;




// import React from 'react';
// import { TextField, TextFieldProps } from '@mui/material';
// import { styled } from '@mui/material/styles';

// // Define a styled version of TextField with custom styles
// const CustomTextField = styled(TextField)(() => ({
//   fontSize: '10px',
//   fontWeight: '100',
// }));

// // Define the StyledTextField component
// const StyledTextField: React.FC<TextFieldProps> = (props) => {
//   // Handle the onChange event
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, id } = event.target;
//     const { type, onChange } = props;

//     // Filter input based on the type
//     if (type === 'number') {
//       // Allow only digits (0-9)
//       const filteredValue = value.replace(/[^0-9]/g, '');
//       if (onChange) {
//         // Call the original onChange with filtered value
//         onChange({ ...event, target: { ...event.target, value: filteredValue } } as any);
//       }
//     } else {
//       // For other types (e.g., text), allow any input
//       if (onChange) {
//         // Call the original onChange with the unfiltered value
//         onChange(event);
//       }
//     }
//   };

//   return (
//     <CustomTextField
//       {...props}
//       // Override the onChange prop with our custom handler
//       onChange={handleChange}
//     />
//   );
// };

// export default StyledTextField;
