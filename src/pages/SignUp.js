import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import OAuth from '../component/OAuth';

export const SignUp = ()=>{
    const [formData, setFormData] = useState({});
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id] : e.target.value,
        })
    }
    

    const handleRegister = async (e)=>{
       e.preventDefault();
       try {
        setLoading(true);
        const res = await axios.post("http://localhost:8000/api/v1/user/sign-up", formData);
        const responseData = res.data;
        if(responseData.success === false){
            setError(responseData.message);
            setLoading(false);
            return; 
        }   
        setLoading(false)
        setError(null)
        navigate("/sign-in")

       } catch (error) {
        console.log(`Error in sign-up : ${error}`);
        setLoading(false);
        setError(error.message);
       }
    }


    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold text-orange-700 my-7'>
                    SignUp
                </h1>
                <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                        alt=" profile-img"className='rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer'/>
                    <input type="text" placeholder='Username' className='border rounded-lg p-3' id='username' 
                        onChange={handleChange} />
                    <input type="email" placeholder='Email' className='border rounded-lg p-3' id='email' 
                        onChange={handleChange}/>
                    <input type="password" placeholder='Password' className='border rounded-lg p-3' id='password'
                         onChange={handleChange}/>   
                    <button disabled={loading} type="submit" 
                        className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
                            {loading ?"Processing" : "Sign-Up"}</button>
                    <OAuth/>
                </form>
                <div className='flex gap-1 mt-2'>
                    <p>Have an account ?</p>
                    <Link to="/sign-in" ><span className='text-blue-700 font-semibold'>Sign-In</span></Link>
                </div>
                {error && <p className='text-red-500 mt-5'>{error}</p>}
            </div>
            
        </>
    )
}