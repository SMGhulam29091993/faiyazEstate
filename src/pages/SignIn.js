import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess, userSelector } from '../redux/user/userSlice';

export const SignIn = ()=>{
    const [formData, setFormData] = useState({});
    const {loading,error, currentUser} = useSelector(userSelector);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await axios.post("http://localhost:8000/api/v1/user/sign-in", formData);
            const responseData = res.data;
    
            if (responseData.success === false) {
                dispatch(signInFailure(responseData.message))
                return;
            }
            dispatch(signInSuccess(responseData.user));
            navigate("/");
            console.log("Current User : ", currentUser);
    
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // other than 2xx.
                console.error("Server Error Response:", error.response.data);
                dispatch(signInFailure(error.response.data.message));
            } else if (error.request) {
                // The request was made but no response was received.
                console.error("No response received from server:", error.request);
                dispatch(signInFailure(error.request))
            } else {
                // Something happened in setting up the request that triggered an Error.
                console.error("Request setup error:", error.message);
                dispatch(signInFailure(error.message))
            }
        }
    };


    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold text-orange-700 my-7'>
                    Sign-In
                </h1>
                <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                    <input type="email" placeholder='Email' className='border rounded-lg p-3' id='email' 
                        onChange={handleChange}/>
                    <input type="password" placeholder='Password' className='border rounded-lg p-3' id='password'
                         onChange={handleChange}/>   
                    <button disabled={loading} type="submit" 
                        className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
                            {loading ?"Logging" : "Sign-In"}</button>
                </form>
                <div className='flex gap-1 mt-2'>
                    <p>New Here ?</p>
                    <Link to="/sign-up" ><span className='text-blue-700 font-semibold'>Sign-Up</span></Link>
                </div>
                {error && <p className='text-red-500 mt-5'>{error}</p>}
            </div>
            
        </>
    )
}