import Cookies from 'js-cookie';
import React from 'react'
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {

    const token = Cookies.get('token')

    if (!token) {
        return <Navigate to="/" replace/>
    }

    return <Outlet/>;

};

export default PrivateRoute;