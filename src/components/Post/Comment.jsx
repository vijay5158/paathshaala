import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from 'react';



function Comment(props) {

    return (
        <>
            <Grid style={{ margin: '1rem' }}>

                <Grid item>
                    <div style={{ display: 'flex' }}>
                        <Avatar src={(props.userImg != null) ? `http://localhost:8000${props.userImg}` : null} alt={props.name} />
                        <Typography style={{ marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} gutterBottom variant="subtitle1">
                            <span style={{ fontSize: '1rem' }}>{props.name}</span>
                            <span style={{ fontSize: '0.7rem', color: 'gray' }}>{props.time}</span>
                        </Typography>

                    </div>
                </Grid>
                <Grid item>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
                            <span style={{ fontSize: '0.8rem', marginBottom: '0.5rem', color: 'dimgray' }}>{props.text}</span>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <hr />
        </>
    );
}

export default Comment;