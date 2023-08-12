import { CircularProgress, FormControl, FormHelperText, InputLabel, NativeSelect } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authLogin, authSignup } from "../../redux/reducers/authReducer";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdPassword } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { green } from "@mui/material/colors";

const handleSlideSignup = () => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });
}

function Signup(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const initialFormDataSignup = Object.freeze({
        name: '',
        email: '',
        mobile: '',
        password: '',
        userType: ''
    })
    const lastFormDataSignup = Object.freeze({
        name: '',
        email: '',
        mobile: '',
        password: '',
        userType: 'student'
    })
    const [formDataSignup, setFormDataSignup] = useState(initialFormDataSignup);
    const handleChangeSignup = (event) => {
        setFormDataSignup({
            ...formDataSignup,
            [event.target.name]: event.target.value.trim(),
        });
    };
    const processDone = ()=>{
        setLoading(false);
        setFormDataLogin(lastFormDataLogin);
        handleClose();
        navigate("/classes");
    }
    const processFail = ()=>{
        setLoading(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let is_student = false;
        let is_teacher = true;
        const { name, email, mobile, password, userType } = formDataSignup;

        if (email?.length > 0 && password?.length > 0 && name?.length > 0 && mobile?.length > 0){
        if (userType === "student") {
            is_student = true
            is_teacher = false
        }
        dispatch(authSignup({name, email, mobile, password, is_student, is_teacher},processDone,processFail));
        setFormDataSignup(lastFormDataSignup);        
    }
    else {
        alert('Please fill all data or data is incorrect!');
      }
    }


    const signupContainer = document.querySelector('#signupContainer')
    useEffect(handleSlideSignup, [signupContainer])
    const initialFormDataLogin = Object.freeze({
        email: '',
        password: '',
    })
    const lastFormDataLogin = Object.freeze({
        email: '',
        password: '',
    })
    const [formDataLogin, setFormDataLogin] = useState(initialFormDataLogin);
    const handleChangeLogin = (event) => {
        setFormDataLogin({
            ...formDataLogin,
            [event.target.name]: event.target.value.trim(),
        });
    };
    const handleClose = () => {
        props.onClose(false);
    }
    const handleSubmitLogin = (event) => {
        event.preventDefault()
        setLoading(true);
        const { email, password } = formDataLogin;
        dispatch(authLogin(email, password, processDone, processFail));

        
    }

    const loginContainer = document.querySelector('#loginContainer')
    useEffect(handleSlideSignup, [loginContainer])

    return (
        <>
            <div className="container max-w-[100%]" id="signupContainer">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="/" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <AiOutlineUser />
                                <input type="text" onChange={handleChangeSignup} id="name" name="name" placeholder="Enter Name" />
                            </div>
                            <div className="input-field">
                                <MdEmail />
                                <input type="email" id="email" onChange={handleChangeSignup} name="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <BsFillTelephoneFill />
                                <input type="num" onChange={handleChangeSignup} id="mobile" name="mobile" placeholder="mobile number" />
                            </div>
                            <div className="input-field">
                                <MdPassword />
                                <input type="password" onChange={handleChangeSignup} id="password" name="password" placeholder="Password" />
                            </div>
                            <FormControl >
                                <InputLabel htmlFor="age-native-helper">Are you ?</InputLabel>
                                <NativeSelect
                                    defaultValue={"0"}
                                    onChange={handleChangeSignup}
                                    id='age-native-helper'
                                    name="userType"
                                >
                                    <option disabled aria-label="None" value="0" />
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </NativeSelect>
                                <FormHelperText>please select accordingly.</FormHelperText>
                            </FormControl>

                            <button type="submit" className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)]" onClick={handleSubmit}>
                            Take Off!
                                {loading && <CircularProgress size={14} color="inherit" />}
                            </button>
                            {/* <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div> */}
                        </form>
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Login</h2>
                            <div className="input-field">
                                <MdEmail />
                                <input type="email" id="email1" onChange={handleChangeLogin} value={formDataLogin?.email} name="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <MdPassword />
                                <input type="password" onChange={handleChangeLogin} value={formDataLogin?.password} name="password" placeholder="Password" />
                            </div>
                            <button type="submit" disabled={loading} onClick={handleSubmitLogin} className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)] solid">
                                Launch
                            {loading &&  <CircularProgress size={14} color="inherit" />}
                                </button>
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>

                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Create virtual PaathShaala for yourself!
                            </p>
                            <button onClick={handleSlideSignup} className="btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src="img/log.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Login to your PaathShaala
                            </p>
                            <button className="btn transparent" id="sign-in-btn">
                                Login in
                            </button>
                        </div>
                        <img src="img/register.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}


// const mapStateToProps = state => {
//     return {
//         loading: state.authReducer.loading,
//         error: state.authReducer.error,
//         token: state.authReducer.token
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         signup: (firstName, lastName, email, mobile, password, isStudent) => dispatch(authSignup(firstName, lastName, email, mobile, password, isStudent)),
//         login: (email, password) => dispatch(authLogin(email, password))
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Signup);

export default Signup;