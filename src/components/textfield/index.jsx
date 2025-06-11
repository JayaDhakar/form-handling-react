import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({
    name,
    label,
    value,
    onChange,
    error,
    helperText,
    type = 'text',
    ...props
}) => {
    return (
        <TextField
            required
            fullWidth
            variant="standard"
            name={name}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={helperText}
            {...props}
        />
    );
};

export default CustomTextField;
