import React, { useEffect, useState } from 'react';
import { FaSearch, FaBars} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import { userSelector } from '../redux/user/userSlice';
import Dropdown from './DropDown';



const Header = ()=>{
    const {currentUser} = useSelector(userSelector);
    const [searchTerm,setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    console.log(searchTerm)
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams= new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        if (searchTermFromURL) {
            setSearchTerm(searchTermFromURL);
        }
    }, [location.search]);

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
                    
                    <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-lg flex items-center'>
                        <input type="text" placeholder='Search...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
                            className='bg-transparent focus:outline-none w-24 sm:w-72'/>
                        <button>
                            <FaSearch className='text-slate-500 cursor-pointer'/>
                        </button>
                        
                    </form>
                    <ul className='flex gap-4'>
                        <li><FaBars className="block md:hidden text-white" onClick={toggleMenu} /></li>
                        {showMenu?(<Dropdown currentUser={currentUser}/>):(

                       <>
                       
                        <Link to="/">
                            <li className='hidden md:inline font-semibold hover:underline cursor-pointer text-white'>Home</li>
                        </Link>
                        <Link to="/about">
                            <li className='hidden md:inline font-semibold hover:underline cursor-pointer text-white'>About</li>
                        </Link>                        
                        <Link to="/profile">
                            {currentUser ? (
                                <li className='hidden md:inline font-semibold hover:underline cursor-pointer text-white flex justify-between'>
                                    {currentUser.user?.avatar || currentUser.avatar?(
                                        <img src={currentUser.user?.avatar || currentUser.avatar} 
                                        alt="Profile" className='w-7 h-7 rounded-full'/>
                                    ):(
                                        <span>{currentUser.user?.username || currentUser.username || 'Profile'}</span>
                                    )}
                                
                                
                                </li>
                            ) : (
                                <li className='text-white font-semibold hover:underline cursor-pointer '>Sign-In</li>
                            )}
                        </Link>
                        </>
                         )}
                    </ul>                    
                </div>
                
            </header>
        </>
    )
}

export default Header;