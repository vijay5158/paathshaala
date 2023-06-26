import Box from '@material-ui/core/Box';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import LoginDialog from "../Login/LoginDialog";
import Class from './Class/Class';
import CreateClass from "./Class/Create";
import JoinClass from "./Class/JoinClass";
import { useAccessToken } from '../../redux/reducers/authReducer';
import { useUser } from '../../redux/reducers/userReducer';
import { getAllClasses, getClasses, useClassLoading } from '../../redux/reducers/classReducer';



const Classes = (props) => {
    const token = useAccessToken();
    const userData = useUser();
    const is_student = userData?.is_student;
    const classes = getAllClasses();
    
    const dispatch = useDispatch();
    const loading = useClassLoading();
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (token) {
            if (classes?.length === 0) {
                dispatch(getClasses(token));
            }
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    if (loading) { return (<Loader />) }
    else {
        return (
            <>
                {(token) ?
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }} >
                        {(classes.length === 0) ? <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', margin: 'auto', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><h1>No Classes to show.</h1><hr />{(is_student) ? <p>Join a Class.</p> : <p>Create a Class.</p>}  </div> :
                            <Box 
                            // display="flex"
                                // flexWrap="wrap"
                                p={1}
                                m={1}
                                // alignItems="center"
                                // justifyContent="center"
                                margin="auto"
                                maxWidth="1200px"
                                // padding="20px"
                                className='w-full grid grid-cols-1 px-2 sm:px-5 md:px-10 lg:px-15 py-4 gap-y-8 gap-x-4  
                                sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                                marginTop='20px'
                                borderRadius='10px'
                            >

                                {classes.map((cls, index) => <Class key={index} classData={cls} />)}

                            </Box>}
                        <button className='fixed right-[2%] mt-[1rem] z-10 rounded-full p-2 bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)] shadow-lg' aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClick}>
                            <AddCircleOutlineRoundedIcon className='text-white' fontSize='large' />
                        </button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                {(is_student) ? <JoinClass close={handleClose} /> : <CreateClass close={handleClose} />}
                            </MenuItem>


                        </Menu>

                    </div>
                    :
                    <div>
                        <h1 style={{ marginTop: '20px' }}>Login to see your classes.</h1>

                        <LoginDialog text="Login" />
                    </div>}
            </>
        )
    }
}



// const mapStateToProps = state => {
//     return {
//         is_student: state.authReducer.is_student,
//         email: state.authReducer.email,
//         loading: state.classReducer.loading,
//         token: state.authReducer.token,
//         classes: state.classReducer.classes
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         getCLS: (token) => dispatch(getCLS(token))
//     };
// };

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Classes));

export default Classes;