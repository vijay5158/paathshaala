import { Input } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import LoginDialog from "../Login/LoginDialog";
import './style.css';
import { createAnnouncement, getAnnouncements, getCurrentClass } from '../../redux/reducers/classReducer';
import { useAccessToken } from '../../redux/reducers/authReducer';
import { useUser } from '../../redux/reducers/userReducer';

function Announcements(props) {
    const { slug } = useParams();
    const accessToken = useAccessToken();
    const dispatch = useDispatch();
    const userData = useUser();
    const announcements = getAnnouncements();
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
        dispatch(createAnnouncement(accessToken, anmnt));
    }

    if (accessToken) {
        return (
            <div style={{ marginTop: '20px' }}>
                <div className="bulletins">
                    <div class="wrap">
                        <div>
                            <span className="title projName" > Announcements </span>

                        </div>

                    </div>


                </div>
                {(!userData.is_student) ? <div className="announcement" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <form action="" className="announcement-form" style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="input-form">

                            <Input placeholder="Enter Announcement" autoFocus={true} onChange={handleChange} name="announcement" id='announcement' fullWidth={true} multiline={true} rows={2} />

                        </div>

                        <div className="button-form">
                            <Button type="reset" onClick={handleSubmit} >
                                <SendIcon style={{ color: '#f74754' }} />
                            </Button>
                        </div>
                    </form>
                </div>
                    : null}
                <div className="bulletins">
                    <div className="wrap">

                        {announcements.map((anmnt) => <div className="announcement" style={{ marginTop: "20px", width: '90%', display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray' }}>
                            <p> {anmnt.announcement}</p></div>
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
