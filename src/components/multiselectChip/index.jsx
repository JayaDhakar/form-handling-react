import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Box,
    Chip
} from '@mui/material';

const MultiSelectChip = ({ selectedSkills, handleChange, options, MenuProps }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="skills-label">Skills</InputLabel>
            <Select
                labelId="skills-label"
                multiple
                value={selectedSkills}
                onChange={handleChange}
                name="skills"
                input={<OutlinedInput id="select-multiple-chip" label="Skills" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                        {skill}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelectChip;
