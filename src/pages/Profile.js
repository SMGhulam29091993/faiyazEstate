import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFailure, deleteStart, deleteSuccess, signOutFailure, signOutStart, signOutSuccess, userSelector } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';



export const Profile = ()=>{
    const {currentUser, token,loading} = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("Token :: ", token);
    const [errorShowListing, setErrorshowListing] = useState(null)
    const [userListing,setUserListing] = useState([]);

    const user_id = currentUser && currentUser.user ? currentUser.user._id : currentUser ? currentUser._id : null;


    const handleUpdateNavigate = ()=>{        
        navigate("/update-profile")
    };

    const handleCreateListNavigate = ()=>{
        navigate("/create-listing")
    };

    const handleDeleteUser = async ()=>{
        try {
            dispatch(deleteStart());
           
            const res = await axios.delete(`https://faiyazestate.onrender.com/api/v1/user/delete/${user_id}`,{
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const responseData = res.data;
            if(responseData.success === false){
                dispatch(deleteFailure(responseData.message));
                return;
            };
            dispatch(deleteSuccess());
            
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Response Data:", error.response.data);
                dispatch(deleteFailure(error.response.data.message));
                console.error("Response Status:", error.response.status);
                console.error("Response Headers:", error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from server:", error.request);
                dispatch(deleteFailure(error.request))
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Request setup error:", error.message);
                dispatch(deleteFailure(error.message))
              }
        }
    };

    const handleLogOut = async ()=>{
        try {
            dispatch(signOutStart());
            console.log('LOADING : ', loading);
            const res = await axios.get(`https://faiyazestate.onrender.com/api/v1/user/sign-out`,{
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });
            const responseData = res.data;
            if(responseData.success === false){
                dispatch(signOutFailure(responseData.message));
                return;
            }
            dispatch(signOutSuccess());
            if(currentUser === null){
                navigate("/sign-in")
                console.log("User: ", currentUser);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Response Data:", error.response.data);
                dispatch(signOutFailure(error.response.data.message));
                console.error("Response Status:", error.response.status);
                console.error("Response Headers:", error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from server:", error.request);
                dispatch(signOutFailure(error.request))
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Request setup error:", error.message);
                dispatch(signOutFailure(error.message))
              }
        };
    };

    const showListing = async ()=>{
        try {
            const res = await axios.get(`https://faiyazestate.onrender.com/api/v1/user/get-listing/${currentUser._id}`,{
                headers:{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            })
            const listingResponse = res.data;
            console.log(listingResponse.listings);
            if(!listingResponse.success){
                setErrorshowListing(listingResponse.message);
            }
            setUserListing(prevState=>[...prevState, ...listingResponse.listings])
        } catch (error) {
            if(error.response){
                setErrorshowListing(error.response.data.message);
            }else if(error.request){
                setErrorshowListing(error.request);
            }else{
                setErrorshowListing(error.message);
            }
        }
    };

    const deleteListing = async (id)=>{
        try {
            const res = await axios.delete(`https://faiyazestate.onrender.com/api/v1/listings/delete-listing/${id}`,{
                headers:{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            })
            const listingResponse = res.data;
            console.log(listingResponse.listings);
            if(!listingResponse.success){
                setErrorshowListing(listingResponse.message);
            }
            setUserListing(prevState=>prevState.filter((listing)=>listing._id !== id))
        } catch (error) {
            if(error.response){
                setErrorshowListing(error.response.data.message);
            }else if(error.request){
                setErrorshowListing(error.request);
            }else{
                setErrorshowListing(error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Component re-rendered. Updated userListing:", userListing);
    }, [userListing]);


    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-3xl text-center text-orange-700 my-2">Profile</h1>
                <div className="flex flex-col gap-4" >
                    <img src={currentUser.user?.avatar || currentUser.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="profile-img"
                     className="rounded-full h-24 w-24 object-cover self-center mt-2 "/>
                     <p className="text-2xl text-center text-slate-200 font-semibold bg-slate-700 p-2 rounded-lg">
                        Name : <span>{currentUser.user?.username || currentUser.username}</span></p>
                     <p className="text-2xl text-center text-slate-200  font-semibold  bg-slate-700 p-2 rounded-lg">
                        Email : <span>{currentUser.user?.email || currentUser.email}</span></p>
                    <button  className='rounded-lg bg-blue-700 uppercase p-3 text-white hover:opacity-80 disabled:opacity-60' onClick={handleUpdateNavigate}>
                        Update Profile</button>
                        <button onClick={handleCreateListNavigate} className="rounded-lg bg-green-700 uppercase p-3 text-white hover:opacity-80 disabled:opacity-60">
                            Create Listing
                        </button>
                    <p className="text-red-600 flex justify-between items-center font-semibold cursor-pointer">
                        <span onClick={handleDeleteUser}>Delete Account</span>
                        <span onClick={showListing} className="text-green-700 font-semibold hover:shadow-md">Show Listing</span>
                        <span onClick={handleLogOut}>Sign Out</span>
                    </p>
                    <p className="text-red-700 text-center">{errorShowListing && errorShowListing}</p>
                    {userListing && userListing.length > 0 &&
                        <div className="flex flex-col gap-4">
                            <h1 className="text-center mt-7 font-semibold text-2xl">Your Listings</h1>
                            {userListing.map((listing)=>
                                <div key={listing._id} className="flex justify-between items-center border rounded-lg p-3">
                                    <Link to={`/listing/${listing._id}`}>
                                        <img src={listing.imageUrl[0]} alt="Listing Cover" className="h-16 w-16 object-contain mr-1"/>
                                    </Link>
                                    <Link to={`/listing/${listing._id}`}  className="text-slate-700 font-semibold flex-1 hover:underline truncate">
                                        <p >{listing.name}</p>
                                    </Link>
                                    <div className="flex flex-col ">  
                                        <button className="text-red-700 uppercase" 
                                            onClick={()=>deleteListing(listing._id)}>Delete</button>
                                        <Link to={`/update-listing/${listing._id}`}>
                                            <button className="text-green-700 uppercase">Edit</button>
                                        </Link>
                                        
                                    </div>
                                </div>
                            )}
                        </div>}
                </div>
            </div>
        </>
    )
}