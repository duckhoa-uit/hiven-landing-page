import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

function TextInputField(props) {
   const { name, label, disabled = false, ...restProps } = props;
   const { control } = useFormContext();

   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { error },
   } = useController({
      name,
      control,
   });

   return (
      <TextField
         fullWidth
         variant="outlined"
         margin="dense"
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         label={label}
         inputRef={ref}
         error={!!error}
         helperText={error?.message}
         disabled={disabled}
         {...restProps}
      />
   );
}

export default TextInputField;
