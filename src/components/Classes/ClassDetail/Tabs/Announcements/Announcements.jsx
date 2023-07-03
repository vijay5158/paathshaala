import { Avatar, CircularProgress, Input } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import LoginDialog from "../../../../Login/LoginDialog";
import './style.css';
import { createAnnouncement, getAllAnnouncements, getCurrentClass } from '../../../../../redux/reducers/classReducer';
import { useAccessToken } from '../../../../../redux/reducers/authReducer';
import { useUser } from '../../../../../redux/reducers/userReducer';
import { BsSendPlusFill } from 'react-icons/bs';


function Announcements(props) {
    const { slug } = useParams();
    const accessToken = useAccessToken();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userData = useUser();
    const announcements = getAllAnnouncements();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const currentClass = getCurrentClass();
    const classId = currentClass.id
    const initialFormData = Object.freeze({
        announcement: '',
        classroom: classId,
    });

    const [anmnt, setAnmnt] = useState(initialFormData);

    const handleChange = (event) => {
        setAnmnt({
            ...anmnt,
            [event.target.name]: event.target.value.trim(),
        });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(anmnt.announcement!=="" && anmnt.classroom){
            setLoading(true);
        dispatch(createAnnouncement(accessToken, anmnt,handleLoading));
    }
}
    const handleLoading = ()=>{
        setAnmnt({
            ...anmnt,
            announcement: ""
        })
        setLoading(false);
    }


    if (accessToken) {
        return (
            <div style={{ marginTop: '20px' }}>
                <div className="bulletins">
                    <div class="my-4">
                        <div>
                            <span className="title projName" > Announcements </span>

                        </div>

                    </div>


                </div>
                {(!userData.is_student) ? <div className="announcement flex items-center justify-center ">

                    <form onSubmit={handleSubmit} className="announcement-form flex items-center justify-center w-[95%] sm:w-[70%] flex-row px-2 py-4 sm:px-4 bg-[rgba(50,50,0,0.1)] rounded shadow-md">
                        <div className="input-form">

                            <Input placeholder="Enter Announcement" autoFocus={true} onChange={handleChange} name="announcement" id='announcement' fullWidth={true} multiline={true} rows={2} value={anmnt.announcement} />

                        </div>

                        <div className="button-form">
                            <Button type='submit' disabled={loading} >
                            {loading ? <CircularProgress size={14} color="light" /> : <BsSendPlusFill style={{ color: '#f74754' }} />}

                            </Button>
                        </div>
                    </form>
                </div>
                    : null}
                <div className="bulletins">
                    <div className="my-8 w-[95%] sm:w-[70%] flex flex-col gap-4 items-center justify-center mx-auto">

                        {announcements.map((anmnt) => (
                        <div className="flex flex-col items-start gap-2 w-full px-2 py-4 sm:px-4 rounded shadow-md bg-[rgba(0,0,255,0.1)]" >
                        <div className="flex flex-row w-full gap-2">
                            <Avatar>{anmnt.created_by ? anmnt.created_by?.slice(0,1):"T"}</Avatar>
                            <h6 className='font-semibold text-base'>{anmnt.created_by}</h6>
                        </div>
                            <p className='text-sm'> {anmnt.announcement}</p>
                        <small className='text-xs text-[rgba(0,0,0,0.5)]'>{new Date(anmnt.created_at).toLocaleString()}</small>
                        </div>)
                        )}

                    </div>


                </div>


            </div>
        );
    }
    else {
        return (
            <div>
                <h1 style={{ marginTop: '20px' }}>Login to see your announcements.</h1>
                <LoginDialog text="Login" />
            </div>
        )
    };
}

// const mapStateToProps = state => {
//     return {
//         authenticated: state.authReducer.token !== null,
//         token: state.authReducer.token,
//         classes: state.classReducer.classes,
//         is_student: state.authReducer.is_student,
//         email: state.authReducer.email,
//         announcements: state.classReducer.announcements
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         createAnmnt: (token, Anmnt) => dispatch(createAnmnt(token, Anmnt)),
//         getAnmnt: (token, slug) => dispatch(getAnmnt(token, slug))
//         // logout: () => dispatch(logout()),
//         // handleLogout: ()=> dispatch(handleLogout())
//     };
// };

export default Announcements;
