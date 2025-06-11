import { Button, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const FileComponent = ({ resumeFile }) => {
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (resumeFile) {
            const url = URL.createObjectURL(resumeFile);
            setFileUrl(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [resumeFile]);

    if (!resumeFile) return null;

    const isPDF = resumeFile.type === 'application/pdf';
    const isImage = resumeFile.type.startsWith('image/');

    return (
        <CardContent>
            <Typography variant="h6" gutterBottom>Resume Preview:</Typography>

            {isPDF && (
                <iframe
                    src={fileUrl}
                    title="PDF Preview"
                    width="100%"
                    height="400px"
                    style={{ border: '1px solid #ccc', borderRadius: '4px' }}
                />
            )}

            {isImage && (
                <img
                    src={fileUrl}
                    alt="Resume Preview"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                />
            )}

            {!isPDF && !isImage && (
                <Typography variant="body2" color="text.secondary">
                    Preview not supported for this file type.
                </Typography>
            )}

            <Button
                variant="outlined"
                href={fileUrl}
                download={resumeFile.name}
                sx={{ mt: 2 }}
            >
                Download Resume
            </Button>
        </CardContent>
    );
};
export default FileComponent;
