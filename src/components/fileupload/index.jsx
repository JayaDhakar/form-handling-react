import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onChange }) => {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload Resume
      <input type="file" hidden onChange={onChange} />
    </Button>
  );
};

export default FileUpload;
