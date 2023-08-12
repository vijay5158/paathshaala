import Card from '@mui/material/Card';
import React from 'react';

const useStyles = () => ({
    card: {
        maxWidth: "345px",
        margin: "12px",
    },
    media: {
        height: "190px",
    },
});

function ClassSkeleton(props) {
    const classes = useStyles();

    return (
        <Card sx={classes.card}>
        </Card>
    );
}

export default ClassSkeleton;