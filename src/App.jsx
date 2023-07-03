import React ,{ Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer/Footer";
import Contact from "./components/Home/Contact";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from "./utils/PrivateRoute";
import { getClasses } from './redux/reducers/classReducer';
import { useAccessToken, useLoading } from "./redux/reducers/authReducer";
import { getUserData } from "./redux/reducers/userReducer";
import Layout from "./components/Layout";
// const Announcements = React.lazy(() => import("./components/Announcements/Announcements"));
const ClassDetail = React.lazy(() => import("./components/Classes/ClassDetail/ClassDetail"));
const Classes = React.lazy(() => import("./components/Classes/Classes"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));

function App(props) {
    const [loading, setLoading] = useState(true);
    const authLoading = useLoading();
    const authToken = useAccessToken()
    const dispatch = useDispatch();
    useEffect(()=> {
        // dispatch(authCheckState())
        if(authToken){
            dispatch(getUserData(authToken));
            dispatch(getClasses(authToken));
        }
        setLoading(false)
            }
    , [])
    if(authLoading || loading){
        return (<Loader/>)
    }
    else {
        return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route exact path='/' element={<Layout><Home /></Layout>} />
                        <Route exact path='/contact/' element={<Layout><Contact /></Layout>}/>
                        <Route element={<PrivateRoute/>}>
                        <Route exact path='/my-account/' element={<Suspense fallback = { <Loader /> } ><Layout><Profile /></Layout></Suspense>}/>
                        <Route exact path='/classes/:slug' element={<Suspense fallback = { <Loader /> } ><Layout><ClassDetail /></Layout></Suspense>}/>
                        <Route exact path='/classes/' element={<Suspense fallback = { <Loader /> } ><Layout><Classes {...props}/></Layout></Suspense>}>
                        </Route>
                        {/* <Route exact path='/announcements/:slug' element={<Suspense fallback = { <Loader /> } ><Announcements {...props}/></Suspense>}> */}
                        {/* </Route> */}
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.authReducer.token !== null,
//         token: state.authReducer.token,
//         loading: state.authReducer.loading
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignup: () => dispatch(authCheckState())
//     };
// };

export default App;
