import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const CustomAutocomplete = ({
    label,
    value,
    onChange,
    options = [],
    multiple = false,
    getOptionLabel,
    renderInput,
}) => {
    return (
        <Autocomplete
            disablePortal
            multiple={multiple}
            options={options || []}
            value={value || (multiple ? [] : null)}
            onChange={onChange}
            getOptionLabel={getOptionLabel || ((option) => {
                if (typeof option === 'string') return option;
                if (typeof option === 'object' && option !== null && 'label' in option) return option.label;
                return '';
            })}

            renderInput={renderInput || ((params) => (
                <TextField {...params} label={label} variant="standard" />
            ))}
        />
    );
};

export default CustomAutocomplete;
