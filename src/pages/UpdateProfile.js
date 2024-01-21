import React from 'react';
import {useSelector} from 'react-redux';
import {userSelector} from "../redux/user/userSlice"

export const UpdateProfile = ()=>{
    const {currentUser} = useSelector(userSelector)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center text-orange-700 my-2'>
                Update Profile
            </h1>
            <form className='flex flex-col gap-4'>
                <img src={currentUser.user.avatar} alt="profile-img" 
                    className='rounded-full h-24 w-24 object-cover self-center mt-2'/>
                <input type="text" placeholder='Username' className='rounded-lg border p-3' 
                    id="username" />
                <input type="email" placeholder='Email' className='rounded-lg border p-3 ' 
                    id="email" />
                <input type="password" placeholder='Password' className='rounded-lg border p-3' 
                    id="password" />
                <button className='rounded-lg bg-blue-700 uppercase p-3 text-white hover:opacity-80 disabled:opacity:60'>Update</button>
            </form>
        </div>
    )
}