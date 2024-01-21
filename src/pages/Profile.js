import React from 'react';
import {useSelector} from 'react-redux';
import { userSelector } from '../redux/user/userSlice';
import  {useNavigate} from "react-router-dom"

export const Profile = ()=>{
    const {currentUser} = useSelector(userSelector);
    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate("/update-profile")
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center text-orange-700 my-2'>
                Profile
            </h1>
            <div className='flex flex-col gap-4'>
                <img src={currentUser.user.avatar} alt="profile-img" 
                    className='rounded-full h-24 w-24 object-cover self-center mt-2'/>
                <p className='font-bold uppercase text-center'>Name : 
                    <span className='text-cyan-950'>{currentUser.user.username}</span> </p>
                <p className='font-bold uppercase text-center'>Email : 
                    <span className='text-cyan-950'>{currentUser.user.email}</span> </p>
    
                <button type="button" className='rounded-lg bg-blue-700 uppercase p-3 text-white hover:opacity-80 disabled:opacity:60'
                    onClick={handleClick}>Update</button>
          
                
            </div>
            <div className='flex justify-between mt-3' >
                <span className='text-red-700 cursor-pointer font-semibold'>Delete Account</span>
                <span className='text-red-700 cursor-pointer font-semibold'>Sign-Out</span>
            </div>
        </div>
    )
}