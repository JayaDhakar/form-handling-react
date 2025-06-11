import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

const GitHubUrl = ({
    value,
    onChange,
    error,
    helperText = 'Enter GitHub username or repo path (e.g., user or user/repo)',
    name = 'githubUrl',
    ...props
}) => {
    const handleInputChange = (e) => {

        const cleanedValue = e.target.value.replace(/^https:\/\/github\.com\//, '');
           onChange(name, cleanedValue);
    };

    return (
        <TextField
            fullWidth
            label="GitHub Username or Repo Path"
            name={name}
            value={value}
            onChange={handleInputChange}
            error={!!error}
            helperText={helperText}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        https://github.com/
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default GitHubUrl;
