import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ()=>{
    const {currentUser} = useSelector(userSelector);
    if(currentUser){
        return <Outlet/>
    }
    return <Navigate to="/sign-in"/>
};

export default PrivateRoute;