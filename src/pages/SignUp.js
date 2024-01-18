import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export const SignUp = ()=>{

    const handleRegister = async (e)=>{
       e.preventDefault();
    }


    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold text-orange-700 my-7'>
                    SignUp
                </h1>
                <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                    <input type="text" placeholder='Username' className='border rounded-lg p-3' id='username'/>
                    <input type="email" placeholder='Email' className='border rounded-lg p-3' id='email'/>
                    <input type="password" placeholder='Password' className='border rounded-lg p-3' id='password'/>   
                    <button type="submit" 
                        className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>Sign-Up</button>
                </form>
                <div className='flex gap-1 mt-2'>
                    <p>Have an account ?</p>
                    <Link to="/sign-in" ><span className='text-blue-700 font-semibold'>Sign-In</span></Link>
                </div>
            </div>
            
        </>
    )
}