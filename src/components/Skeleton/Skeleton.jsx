import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    media: {
        height: 190,
    },
}));

function ClassSkeleton(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
        </Card>
    );
}

export default ClassSkeleton;