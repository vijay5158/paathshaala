import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogin } from '../../redux/reducers/authReducer';


const handleSlide = () => {
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

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

        handleClose();
        navigate('/');
        setFormDataLogin(lastFormDataLogin);
    }

    const loginContainer = document.querySelector('#loginContainer')
    useEffect(handleSlide, [loginContainer])
    return (
        <div>
            <div className="container w-[100%]" id="loginContainer">

                <div className="forms-container">
                    <div className="signin-signup">
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
                            <input type="submit" value="Login" disabled={loading} onClick={handleSubmitLogin} className="btn solid" />
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
                            <button onClick={handleSlide} className="btn transparent" id="sign-up-btn">
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
        </div>
    );
}

// const mapStateToProps = state => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error,
//         token: state.auth.token
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         login: (email, password) => dispatch(authLogin(email, password))
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Login);

export default Login;