import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useAccessToken } from "../../../redux/reducers/authReducer";
import { useUser } from "../../../redux/reducers/userReducer";
import { createCLS } from "../../../redux/reducers/classReducer";
import { CircularProgress, Input, Typography } from "@mui/material";

function CreateClass(props) {
    const accessToken = useAccessToken();
    const userData = useUser();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const initialFormData = Object.freeze({
        classname: '',
        subject : '',
        standard : '',
        email: ''

    })
    const [FormData, setFormData] = useState(initialFormData);
    const handleChange = (event)=>{
        setFormData({
            ...FormData,
            [event.target.name] : event.target.value.trim(),
        });
    };
    const createClass = (event)=>{
        event.preventDefault();
    if (FormData.classname !== '' && FormData.standard !== '' && FormData.subject !== '') {
        setLoading(true);
        const cls = {
            class_name : FormData.classname,
            standard : FormData.standard,
            subject : FormData.subject,
            teachers : userData?.email
        }
        dispatch(createCLS(accessToken,cls,setOpen, setLoading));
    }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseclass = () => {
        setOpen(false);
    };
    return (
        <div>
            <a  onClick={handleClickOpen}>
                Create Class
            </a>
            
            <Dialog open={open} onClose={handleCloseclass} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Class</DialogTitle>
                <div >
                    <DialogContent>
                    <DialogContentText>
                        To create a class , please enter class details.

                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="classname"
                        label="Class Name"
                        type="text"
                        fullWidth
                        name="classname"
                        onChange={handleChange}
                        value={FormData?.classname}
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={FormData?.subject}
                        variant="outlined"
                        name = "subject"
                    />
                    <TextField
                        margin="dense"
                        id="standard"
                        label="Standard"
                        type="text"
                        fullWidth
                        name="standard"
                        value={FormData?.standard}
                        variant="outlined"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseclass} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} onClick={createClass} color="primary">
                        Create Class
            {loading && <CircularProgress size={24} color="primary" />}

                    </Button>

                </DialogActions>
                </div>
                </Dialog>
        </div>
    );
}

// const mapStateToProps = state => {
//     return {
//         email: state.authReducer.email,
//         loading: state.authReducer.loading,
//         token: state.authReducer.token
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         createCLS: (token, cls) => dispatch(createCLS(token,cls)),
//         getCLS: (token) => dispatch(getCLS(token))
//     };
// };

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CreateClass));

export default CreateClass;