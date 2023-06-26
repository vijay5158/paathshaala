import Button from '@material-ui/core/Button';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import './profile.css'
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import logo from "../../images/logo1.png";
import Login from '../Login/LoginDialog';
import './style.css';
import { authLogout, useAccessToken } from '../../redux/reducers/authReducer';



const Navbar = (props) => {
    const dispatch = useDispatch();
    const token = useAccessToken();
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
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },
        sideBarButton: {
            Color: '#d14467',
            fontSize: '30px'

        },
    }));
    const classes = useStyles();
    useEffect(() => scripts(), []);
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseLogout = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        dispatch(authLogout())
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <nav className="navbar nav background1 h-nav-resp sm:h-[70px] px-4">
                <ul className="nav-list justify-end sm:justify-start w-[100%] gap-2 v-class-resp h-full">
                  <div className="hidden sm:contents h-full">
                    <div className="logo h-full">
                        <img src={logo} alt="logo" className='h-[60px]' />
                        <h6 className='text-xl text-[#58418b] font-semibold'>PaathShaala</h6>
                    </div>
                    </div>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/classes/">Classes</Link></li>

                    <li><Link to="/to-do/">To-Do</Link></li>
                </ul>
                <div className="rightNav v-class-resp">
                    {token ? <div className='rightNavResp'>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <AccountCircle style={{ color: 'rgb(88,65,139)' }} className={classes.sideBarButton} />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><Link to="/my-account/" style={{ textDecoration: 'none' }}>My account</Link></MenuItem>
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