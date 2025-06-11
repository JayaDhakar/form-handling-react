import React from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup as MuiRadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText
} from '@mui/material';

const CustomRadioGroup = ({ value, onChange, errors }) => {
    return (
        <FormControl component="fieldset" error={!!errors.gender}>
            <FormLabel component="legend" id="gender-radio-group-label">Gender</FormLabel>
            <MuiRadioGroup
                aria-required="true"
                row
                aria-labelledby="gender-radio-group-label"
                name="gender"
                value={value}
                onChange={onChange}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                {/* <FormControlLabel
                    value="disabled"
                    disabled
                    control={<Radio />}
                    label="Disabled"
                /> */}
            </MuiRadioGroup>

            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
    );
};

export default CustomRadioGroup;
