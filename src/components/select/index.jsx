import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomSelect = ({ label, name, value, onChange, options = [], error }) => {
    return (
        <FormControl fullWidth variant="standard" error={Boolean(error)}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                value={value}
                name={name}
                onChange={onChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;
