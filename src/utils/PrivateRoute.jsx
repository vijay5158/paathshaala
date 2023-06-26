import React from 'react'
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';

const PrivateRoute = ({ children }) => {

    const cookies = new Cookies();
    const token = cookies.get('token')

    if (!token) {
        return <Navigate to="/" replace/>
    }

    return <Outlet/>;

};

export default PrivateRoute;