import { Breadcrumbs, Button, Chip, emphasize, Input, withStyles } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import FormData from 'form-data';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './profile.css';
import { useAccessToken } from "../../redux/reducers/authReducer";
import { updateUserData, useUser } from "../../redux/reducers/userReducer";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip);

function Profile(props) {
    const authData = useUser();
    const authToken = useAccessToken()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    function handleClick(event) {
        event.preventDefault();
        navigate('/');
    }

    if (!authToken) {

        navigate('/')
    }
    const initialUserData = Object.freeze({
        first_name: authData?.name?.split(" ")?.length>0 ? authData?.name?.split(" ")[0]:"",
        last_name: authData?.name?.split(" ")?.length>1 ? authData?.name?.split(" ")[1] : "",
        password: '',
        email: authData?.email,
        mobile: authData?.mobile,

    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const [userData, setUserData] = useState(initialUserData);
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState(null);

    const handleChangeProfile = (event) => {
        setProfile({
            profile_img: event.target.files,

        });
    }

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value.trim(),
        });
    };

    const edit = (e) => {
        setEditMode(true)
    }
    let updatedData = new FormData()

    updatedData.append('first_name', userData.first_name)
    updatedData.append('last_name', userData.last_name)
    updatedData.append('email', userData.email)
    updatedData.append('mobile', userData.mobile)

    const editSubmit = (e) => {
        if (userData.password.length != 0) {

            updatedData.append('password', userData.password)

        }
        if (profile != null) {

            updatedData.append('profile_img', profile.profile_img[0])

        }

        dispatch(updateUserData(updatedData, authData?.userId, authToken));
        setEditMode(false)
        document.getElementById('password').value = '';
    }

    return (
        <>
            <div className="container1">
                <div className="main-body">
                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            href="/"
                            label="Home"
                            icon={<HomeIcon fontSize="small" />}
                            onClick={handleClick}
                        />
                        <StyledBreadcrumb
                            label="User Profile"
                            deleteIcon={<ExpandMoreIcon />}
                            onClick={handleClick}
                            onDelete={handleClick}
                        />
                    </Breadcrumbs>


                    <div className="row gutters-sm resp">
                        <div className="col-md-4 mb-3 profile-div">
                            <div className="card" style={{ boxShadow: '2px 10px 20px rgba(0,0,0, 0.3)', marginBottom: '1.1rem', borderRadius: '0.5rem' }}>
                                <div className="card-body">
                                    <div className="profile-img">
                                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                                            <img src={(authData?.profileImg) ? authData?.profileImg : "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin"
                                                className="rounded-circle" style={{ width: '9rem', borderRadius: '50%' }} />
                                            {(editMode) ? <> <Edit />
                                                <Input type="file" id="profile_img"
                                                    accept="image/*"
                                                    onChange={handleChangeProfile} disableUnderline={true} name="profile_img" />
                                            </>
                                                : null}

                                        </div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <h4 style={{ fontSize: '1.5rem', color: '#58418b' }}>{userData.firstName}</h4>
                                            <h5 className="text-secondary mb-1" style={{ marginBottom: '0.25rem', fontSize: '1rem', color: '#d14467' }}>{(authData?.is_student) ? 'Student' : 'Teacher'}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3" style={{ marginTop: '1rem', boxShadow: '2px 10px 20px rgba(0,0,0, 0.3)', padding: '1.2rem', marginBottom: '1.1rem', borderRadius: '0.5rem' }}>
                                <ul className="list-group list-group-flush" style={{ listStyleType: 'none' }}>
                                    <li className="list-group-item">
                                        <h3 style={{ marginBottom: '0' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                className="feather feather-globe mr-2 icon-inline">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                                <path
                                                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                            </svg>
                                            Website
                                        </h3>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </li>
                                    <li className="list-group-item  ">
                                        <h3 style={{ marginBottom: '0' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                className="feather feather-github  icon-inline"
                                                style={{ marginRight: '0.5rem' }}
                                            >
                                                <path
                                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                            Github
                                        </h3>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item ">
                                        <h3 style={{ marginBottom: '0' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                style={{ marginRight: '0.5rem', color: 'deepskyblue' }}
                                                className="feather feather-twitter mr-2 icon-inline text-info">

                                                <path
                                                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                            </svg>
                                            Twitter
                                        </h3>
                                        <span className="text-secondary">@bootdey</span>
                                    </li>
                                    <li className="list-group-item  ">
                                        <h3 style={{ marginBottom: '0' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                style={{ marginRight: '0.5rem', color: 'red' }}
                                                className="feather feather-instagram mr-2 icon-inline text-danger">
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                            </svg>
                                            Instagram
                                        </h3>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item  ">
                                        <h3 style={{ marginBottom: '0' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                style={{ marginRight: '0.5rem', color: 'dodgerblue' }}
                                                className="feather feather-facebook mr-2 icon-inline text-primary">
                                                <path
                                                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                            </svg>
                                            Facebook
                                        </h3>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8 profile-detail">
                            <div className="card mb-3 detail-div">
                                <div className="card-body">
                                    <div className="row1">
                                        <div className="col-3" >
                                            <h3 style={{ color: '#f74754',marginBottom: '0'  }}>First Name</h3>
                                        </div>
                                        <Input className="col-9 text-secondary" onChange={handleChange} name='first_name' readOnly={(editMode) ? false : true} disableUnderline={(editMode) ? false : true} defaultValue={userData.first_name} />

                                    </div>
                                    <hr />
                                    <div className="row1">
                                        <div className="col-3">
                                            <h3 style={{ color: '#e6455c',marginBottom: '0'  }}>Last Name</h3>
                                        </div>
                                        <Input className="col-9 text-secondary" onChange={handleChange} name='last_name' readOnly={(editMode) ? false : true} disableUnderline={(editMode) ? false : true} defaultValue={userData.last_name} />

                                    </div>
                                    <hr />
                                    <div className="row1">
                                        <div className="col-3">
                                            <h3 style={{ color: '#d14467',marginBottom: '0'  }}>Email</h3>
                                        </div>
                                        <Input className="col-9 text-secondary" onChange={handleChange} name='email' readOnly={(editMode) ? false : true} disableUnderline={(editMode) ? false : true} defaultValue={userData.email} />

                                    </div>
                                    <hr />
                                    <div className="row1">
                                        <div className="col-3">
                                            <h3 style={{ color: '#944688',marginBottom: '0'  }}>Mobile</h3>
                                        </div><Input className="col-9 text-secondary" name='mobile' onChange={handleChange} readOnly={(editMode) ? false : true} disableUnderline={(editMode) ? false : true} defaultValue={userData.mobile} />

                                    </div>
                                    <hr />
                                    <div className="row1">
                                        <div className="col-3">
                                            <h3 style={{ color: '#58418b',marginBottom: '0'  }}>Password</h3>
                                        </div>
                                        <Input className="col-9 text-secondary" onChange={handleChange} name='password' id='password' readOnly={(editMode) ? false : true} disableUnderline={(editMode) ? false : true} placeholder='***********' />

                                    </div>
                                    <hr />
                                    <div className="row1">
                                        <div className="col-sm-12">
                                            {(editMode) ? <Button className="btn btn-sm btn-info " style={{ color: 'white', textDecoration: 'none', borderRadius: '3px' }} target="__blank"
                                                onClick={editSubmit}>Submit</Button>
                                                :
                                                <Button className="btn btn-sm btn-info " style={{ color: 'white', textDecoration: 'none', borderRadius: '3px' }} target="__blank"
                                                    onClick={edit}>Edit</Button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row gutters-sm progress-div">
                                <div className="col-sm-6 progress1">
                                    <div className="card" style={{ height: '100%', boxShadow: '2px 10px 20px rgba(0,0,0, 0.3)' }}>
                                        <div className="card-body">
                                            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }} ><i
                                                className="material-icons text-info mr-2" style={{ marginTop: '0.5rem' }}>Assignment Status</i></h3>
                                            <small>Assignment - 1</small>
                                            <div className="progress" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assignment - 2</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "72%" }} aria-valuenow="72" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assignment - 3</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "89%" }} aria-valuenow="89" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assignment - 4</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "55%" }} aria-valuenow="55" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assignment - 5</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "66%" }} aria-valuenow="66" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-3 progress2">
                                    <div className="card h-100" style={{ height: '100%', boxShadow: '2px 10px 20px rgba(0,0,0, 0.3)' }}>
                                        <div className="card-body">
                                            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                                <i style={{ marginTop: '0.5rem' }} className="material-icons text-info mr-2">Assessment Status</i></h3>
                                            <small>Assessment - 1</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assessment - 2</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "72%" }} aria-valuenow="72" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assessment - 3</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "89%" }} aria-valuenow="89" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assessment - 4</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "55%" }} aria-valuenow="55" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <small>Assessment - 5</small>
                                            <div className="progress mb-3" style={{ height: "5px", marginBottom: '1rem' }}>
                                                <div className="progress-bar bg-primary" role="progressbar"
                                                    style={{ width: "66%" }} aria-valuenow="66" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

// const mapStateToProps = state => {
//     return {
//         userId: state.authReducer.userId,
//         token: state.authReducer.token,
//         firstName: state.authReducer.firstName,
//         lastName: state.authReducer.lastName,
//         email: state.authReducer.email,
//         mobile: state.authReducer.mobile,
//         isStudent: state.authReducer.is_student,
//         profileImg: state.authReducer.profileImg,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         logout: () => dispatch(logout()),
//         updateUserData: (userData, userId, token) => dispatch(updateUserData(userData, userId, token))
//     };
// };

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Profile));

export default Profile;