import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import { userSelector } from '../redux/user/userSlice';



const Header = ()=>{
    const {currentUser} = useSelector(userSelector);
    console.log(currentUser)
    return (
        <>
            <header className='bg-slate-700 shadow-md'>
                <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                    <Link to="/">
                        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap' >
                            <span className='text-lime-300 italic font-semibold'>faiyaz</span>
                            <span className='text-amber-500 font-sans '>Estate</span>
                        </h1>
                    </Link>
                    
                    <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
                        <input type="text" placeholder='Search...' 
                            className='bg-transparent focus:outline-none w-24 sm:w-72'/>
                        <FaSearch className='text-slate-500 cursor-pointer'/>
                    </form>
                    <ul className='flex gap-4'>
                        <Link to="/">
                            <li className='hidden sm:inline font-semibold hover:underline cursor-pointer text-white'>Home</li>
                        </Link>
                        <Link to="/about">
                            <li className='hidden sm:inline font-semibold hover:underline cursor-pointer text-white'>About</li>
                        </Link>                        
                        <Link to="/profile">
                            {currentUser ? (
                                <li className=' sm:inline font-semibold hover:underline cursor-pointer text-white flex justify-between'>
                                    {currentUser.user?.avatar || currentUser.avatar?(
                                        <img src={currentUser.user?.avatar || currentUser.avatar || 'Profile'} 
                                        alt="Profile" className='w-7 h-7 rounded-full'/>
                                    ):(
                                        <span>{currentUser.user?.username || currentUser.username || 'Profile'}</span>
                                    )}
                                
                                
                                </li>
                            ) : (
                                <li className='text-white font-semibold hover:underline cursor-pointer '>Sign-In</li>
                            )}
                        </Link>
                    </ul>                    
                </div>
                
            </header>
        </>
    )
}

export default Header;