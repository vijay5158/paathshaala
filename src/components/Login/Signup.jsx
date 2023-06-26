import { FormControl, FormHelperText, InputLabel, NativeSelect } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authLogin, authSignup } from "../../redux/reducers/authReducer";

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
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        userType: ''
    })
    const lastFormDataSignup = Object.freeze({
        firstName: '',
        lastName: '',
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
    const handleSubmit = (event) => {
        event.preventDefault()
        let is_student = false;
        let is_teacher = true;
        const { firstName, lastName, email, mobile, password, userType } = formDataSignup;
        const name = firstName+" "+lastName;
        if (email?.length > 0 && password?.length > 0 && name?.length > 0 && mobile?.length === 10){
        if (userType === "student") {
            is_student = true
            is_teacher = false
        }
        dispatch(authSignup({name, email, mobile, password, is_student, is_teacher},setLoading));
        setFormDataSignup(lastFormDataSignup);
        navigate('/');
        handleClose();
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
        dispatch(authLogin(email, password, setLoading));

        setFormDataLogin(lastFormDataLogin);
        handleClose();
        navigate('/');
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
                                <i className="fas fa-user"></i>
                                <input type="text" onChange={handleChangeSignup} id="firstName" name="firstName" placeholder="first name" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" id="lastName" onChange={handleChangeSignup} name="lastName" placeholder="last name" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" id="email" onChange={handleChangeSignup} name="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="num" onChange={handleChangeSignup} id="mobile" name="mobile" placeholder="mobile number" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" onChange={handleChangeSignup} id="password" name="password" placeholder="Password" />
                            </div>
                            <FormControl >
                                <InputLabel htmlFor="age-native-helper">Are you ?</InputLabel>
                                <NativeSelect

                                    onChange={handleChangeSignup}
                                    id='age-native-helper'
                                    name="userType"

                                >
                                    <option aria-label="None" value="" />
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </NativeSelect>
                                <FormHelperText>please select accordingly.</FormHelperText>
                            </FormControl>

                            <input type="submit" className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)]" onClick={handleSubmit} value="Sign up" />
                            <p className="social-text">Or Sign up with social platforms</p>
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
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Login</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="email" id="email1" onChange={handleChangeLogin} name="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" onChange={handleChangeLogin} name="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" disabled={loading} onClick={handleSubmitLogin} className="btn bg-[linear-gradient(45deg,#FF2C4F,#0B31D0)] solid" />
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
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn">
                                Sign in
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