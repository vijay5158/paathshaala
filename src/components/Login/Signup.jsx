import { CircularProgress, FormControl, FormHelperText, InputLabel, NativeSelect } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authLogin, authSignup } from "../../redux/reducers/authReducer";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdPassword } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { PiStudentFill } from "react-icons/pi";

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
        userType: '0'
    })
    const lastFormDataSignup = Object.freeze({
        name: '',
        email: '',
        mobile: '',
        password: '',
        userType: ''
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
        setLoading(true);
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
                        <form onSubmit={handleSubmit} className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <AiOutlineUser />
                                <input type="text" value={formDataSignup?.name} required onChange={handleChangeSignup} id="name" name="name" placeholder="Enter Name" />
                            </div>
                            <div className="input-field">
                                <MdEmail />
                                <input type="email" required id="email" value={formDataSignup?.email} onChange={handleChangeSignup} name="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                            <span className="font-semibold text-[#acacac] text-[1.1rem] ml-[10px]">+91</span>
                                <input type="text" pattern="\d{10}" value={formDataSignup?.mobile} required title="Please enter a valid 10-digit phone number" onChange={handleChangeSignup} id="mobile" name="mobile" placeholder="mobile number" />
                            </div>
                            <div className="input-field">
                                <MdPassword />
                                <input type="password" required value={formDataSignup?.password} onChange={handleChangeSignup} id="password" name="password" placeholder="Password" />
                            </div>
                            <div className="input-field">
                                {/* <InputLabel htmlFor="age-native-helper">Are you ?</InputLabel> */}
                                <PiStudentFill />
                                <select
                                    className="bg-transparent border-0 cursor-pointer outline-none h-full text-[1.1rem] text-[#333] font-semibold"
                                    // defaultValue={"0"}
                                    onChange={handleChangeSignup}
                                    id='age-native-helper'
                                    name="userType" 
                                    required
                                    value={formDataSignup?.userType}
                                >
                                    <option disabled aria-label="None" value="0">Choose Role</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                                {/* <FormHelperText>please select accordingly.</FormHelperText> */}
                            </div>

                            <button type="submit" className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)] flex gap-2 items-center">
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
                        <form onSubmit={handleSubmitLogin} className="sign-in-form">
                            <h2 className="title">Login</h2>
                            <div className="input-field">
                                <MdEmail />
                                <input type="email" required id="email1" onChange={handleChangeLogin} value={formDataLogin?.email} name="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <MdPassword />
                                <input type="password" required onChange={handleChangeLogin} value={formDataLogin?.password} name="password" placeholder="Password" />
                            </div>
                            <button type="submit" disabled={loading} className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)] solid flex gap-2 items-center">
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