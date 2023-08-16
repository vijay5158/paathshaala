import Button from '@mui/material/Button';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import './profile.css'
import {FaUserAlt} from 'react-icons/fa';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import logo from "../../images/logo1.png";
import Login from '../Login/LoginDialog';
import './style.css';
import { authLogout, useAccessToken, useRefreshToken } from '../../redux/reducers/authReducer';
import { useUser } from '../../redux/reducers/userReducer';



const Navbar = (props) => {
    const dispatch = useDispatch();
    const token = useAccessToken();
    const refreshToken = useRefreshToken();
    const userData = useUser();
    const scripts = () => {
        const burger = document.querySelector('.burger')
        const navbar = document.querySelector('.navbar')
        const navList = document.querySelector('.nav-list')
        const rightNav = document.querySelector('.rightNav')



        burger.addEventListener('click', () => {
            rightNav.classList.toggle('v-class-resp');
            navList.classList.toggle('v-class-resp');
            navbar.classList.toggle('h-nav-resp');
        })
        navHide()

    }
    const navHide = () => {
    }
    const useStyles = () => ({
        sideBarButton: {
            Color: '#d14467',
            fontSize: '40px',
            color: 'rgb(88, 65, 139)',
            border: '3px solid rgb(88, 65, 139)',
            padding: '0.3rem',
            borderRadius: '50%'

        },
    });
    const classes = useStyles();
    useEffect(() => scripts(), []);
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseLogout = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        dispatch(authLogout(token, refreshToken))
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <nav className="navbar nav background1 h-nav-resp sm:h-[70px] px-4">
                <ul className="nav-list justify-end sm:justify-start w-[100%] gap-2 v-class-resp h-full">
                  <div className="hidden sm:contents h-full">
                  <Link to="/" className="logo h-full">
                        <img src={logo} alt="logo" className='h-[60px]' />
                        {/* <h6 className='text-xl text-[#58418b] font-semibold'>PaathShaala</h6> */}
                    </Link>
                    </div>
                    {/* <li><Link to="/">Home</Link></li> */}
                  {token && <li><Link to="/classes/">Classes</Link></li>}

                    {/* <li><Link to="/to-do/">To-Do</Link></li> */}
                </ul>
                <div className="rightNav v-class-resp">
                    {token ? <div className='rightNavResp'>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            {userData?.profile_img ?
                            <img src={userData?.profile_img} alt="profile_img" className='w-[40px] h-[40px] rounded-full' />
                            :
                            <FaUserAlt sx={classes.sideBarButton} />
                            }
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem> <Link onClick={handleClose} to="/my-account/" style={{ textDecoration: 'none' }}>My account</Link></MenuItem>
                            <MenuItem onClick={handleCloseLogout}><Link to="/" style={{ textDecoration: 'none' }}>Logout</Link></MenuItem>
                        </Menu>
                    </div> : <div className='rightNavResp'> <Login text="Login" /> </div>}

                </div>

                <div className="burger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </nav>







        </>
    );
}
// const mapStateToProps = state => {
//     return {
//         authenticated: state.authReducer.token !== null,
//         token: state.authReducer.token
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         logout: () => dispatch(logout()),
//         handleLogout: () => dispatch(handleLogout())
//     };
// };

// export default withRouter(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(Navbar))

export default Navbar;