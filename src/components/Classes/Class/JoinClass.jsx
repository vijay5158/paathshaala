import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "../../../redux/reducers/authReducer";
import { useUser } from "../../../redux/reducers/userReducer";
import { getAllClasses, joinCLS } from "../../../redux/reducers/classReducer";
import { CircularProgress } from "@mui/material";

function JoinClass(props) {
    const accessToken = useAccessToken();
    const userData = useUser();
    const classes = getAllClasses();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const initialData = Object.freeze({
        slug: '',
        student_id: userData?.userId,
    });

    const [data, setData] = useState(initialData);
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value.trim(),
        });

    };
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleCloseClass = () => {
        setOpen(false);
        props.close();

    };
    function handleJoin() {
        const duplicateClass = classes.filter((cls) => {
            return cls.slug === data.slug
        })
        if (duplicateClass.length === 0) {
            if(data.slug!==""){
                setLoading(true);
                dispatch(joinCLS(accessToken, data, setOpen, setLoading));
        }
        else {
            alert('Fill class code!')
        }
     
    }
        else {
            alert('You are already joined.')
        }
        handleCloseClass();

    }

    // useEffect(() => {
    //     console.log(props.classes)
    // }, []);
    return (
        <div><a onClick={handleClickOpen}>
            Join Class
        </a>
            <Dialog open={open} onClose={handleCloseClass} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Join Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To join class , please enter class details.

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="uniqueCode"
                        label="Enter the class unique code"
                        type="text"
                        fullWidth
                        name="slug"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClass} id="main-div" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleJoin} disabled={loading} color="primary">
                        Join Class
            {loading && <CircularProgress size={24} color="primary" />}

                    </Button>
                </DialogActions>
            </Dialog></div>
    );
}

// const mapStateToProps = state => {
//     return {
//         userId: state.authReducer.userId,
//         token: state.authReducer.token,
//         classes: state.classReducer.classes
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         joinClass: (token, data) => dispatch(joinCLS(token, data)),
//         getCLS: (token) => dispatch(getCLS(token))
//     };
// };

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(JoinClass));

export default JoinClass;