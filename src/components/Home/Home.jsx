import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/logo1.png";
import Login from "../Login/LoginDialog";
import '../Navbar/style.css';
import About from "./About";
import Contact from "./Contact";
import { useAccessToken } from '../../redux/reducers/authReducer';
import { useUser } from '../../redux/reducers/userReducer';

function Home(props) {
    const token = useAccessToken();
    const userData = useUser();
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (

        <div>
            <section className="background firstSection">
                <div className="box-main">
                    {(!token) ? <div className="w-[60%] flex flex-col items-center justify-center gap-2">
                        <p className="text-big1">Get more time to teach and inspire learners with <span
                            className="projName">PaathShaala</span></p>
                        <div className="main-para"><p className="text-small1">A free and easy tool helping educators
                            efficiently manage
                            and assess progress, while enhancing connections with learners from school, from home,
                            or on the go.</p>
                        </div>
                        <div className="buttons">
                            <Login text="Getting Started" />


                        </div>
                    </div> : <div className="firstHalf" style={{ alignItems: 'center' }}>
                        <p className="text-big1">Welcome back ! <span
                            className="projName">{userData?.name}</span></p>

                        <div className="buttons">
                            <Link to='classes/'><button className="btn">Go to Classroom</button></Link>


                        </div>
                    </div>}


                    <div className="secondHalf">
                        <img src={logo} alt="Laptop" className="vert-move" />
                    </div>
                </div>
            </section>

            {(!token) ? <div><About /><Contact /></div> : null}



        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         authenticated: state.authReducer.token !== null,
//         token: state.authReducer.token,
//         firstName: state.authReducer.firstName,
//         lastName: state.authReducer.lastName,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         logout: () => dispatch(logout())
//     };
// };

// export default withRouter(
//     connect(
//         mapStateToProps,
//         mapDispatchToProps
//     )(Home))
export default Home;