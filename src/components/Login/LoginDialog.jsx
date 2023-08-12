import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import {MdClose} from 'react-icons/md';
import React from 'react';
import Signup from "./Signup";
import './style.css';
import { Link } from 'react-router-dom';

const useStyles = () => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: "10px",
        flex: 1,
    },
});


export default function LoginDialog(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div id='dialogDiv'>
            <Button className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)]" style={{ textTransform: 'capitalize', color: 'white', fontFamily: 'Audiowide' }} onClick={handleClickOpen}>
                {props.text}
            </Button>

            <Dialog fullScreen open={open} onClose={handleClose} >
                <Link to="/" className='absolute left-[15px] top-[10px] z-[9]'><IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <MdClose />
                </IconButton></Link>

                <Signup onClose={setOpen} />
            </Dialog>
        </div>
    );
}
