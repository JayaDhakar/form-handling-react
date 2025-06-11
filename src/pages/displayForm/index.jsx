import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Card, CardHeader, CardContent, CardActions,
    Collapse, Avatar, IconButton, Typography,
    Button
} from '@mui/material';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileComponent from '../../components/fileComponent';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const DisplayForm = ({ formState }) => {
    const [expanded, setExpanded] = useState(false);

    if (!formState) return <Typography variant="h6">No data submitted.</Typography>;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 600, margin: '2rem auto' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                        {formState.name?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`Details of ${formState.name.toUpperCase()}`}
                subheader={new Date().toLocaleString()}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image={formState.resume}
                alt="Paella dish"
            /> */}


            <FileComponent resumeFile={formState.resume} />


            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Click expand to view all submitted details.
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph><strong>Name:</strong> {formState.name}</Typography>
                    <Typography paragraph><strong>Email:</strong> {formState.email}</Typography>
                    <Typography paragraph><strong>Contact No:</strong> {formState.contactNo}</Typography>
                    <Typography paragraph><strong>Gender:</strong> {formState.gender}</Typography>
                    <Typography paragraph><strong>Country:</strong> {formState.country}</Typography>
                    <Typography paragraph><strong>State:</strong> {formState.state}</Typography>
                    <Typography paragraph><strong>City:</strong> {formState.city}</Typography>
                    <Typography paragraph><strong>GitHub URL:</strong> {formState.githubUrl}</Typography>
                    <Typography paragraph>
                        <strong>Branch:</strong> {Array.isArray(formState.branch) ? formState.branch.join(', ') : formState.branch}
                    </Typography>
                    <Typography paragraph>
                        <strong>Skills:</strong> {Array.isArray(formState.skills) ? formState.skills.join(', ') : formState.skills}
                    </Typography>
                    <Typography paragraph>
                        <strong>Resume:</strong> {formState.resume?.name || 'N/A'}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default DisplayForm;
