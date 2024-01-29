import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateUserError, updateUserStart, updateUserSuccess, userSelector} from "../redux/user/userSlice"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firbase-init';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const UpdateProfile = ()=>{
    const {currentUser, token, loading, error,} = useSelector(userSelector)
    const fileRef = useRef(null);
    const [file,setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError,setFileUploadError] = useState(false);
    const [formData,setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateDone, setUpdateDone] = useState(false);
    console.log("Access Token: " , token);
    // console.log(token);
    // console.log(currentUser._id)
    useEffect(()=>{
        if(file){
            handleFileUpload(file);
        };
    },[file]);

    const handleFileUpload = (file) => {

        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
       
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done.');
            setFilePerc(Math.round(progress))
          },
          (error) => {
            setFileUploadError(true);
            console.error('Error uploading file:', error);
            // Handle error here (e.g., show an error message to the user)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL)=>{
                setFormData({...formData, avatar : downloadURL})
            })

            // Upload completed successfully
            console.log('Upload completed successfully.');

          }
        );
      };

      const handleChange= (e)=>{
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
      };

      const handleSubmit = async (e)=>{
        e.preventDefault();
        
        
        try {
            dispatch(updateUserStart());
            const res = await axios.put(
                `http://localhost:8000/api/v1/user/update/${currentUser.user?._id || currentUser._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization : `Bearer ${token}`
                    },
                    withCredentials: true,
                }
            );
            console.log("Request Headers:", res.config.headers);
            
            console.log("Axios Config: ", res.config);
        
            console.log("Axios Response:", res);
            const responseData = res.data;
            if(responseData.success === false){
                dispatch(updateUserError(responseData.message));
                return;
            }

            dispatch(updateUserSuccess(responseData.user));   
            setUpdateDone(true);
        } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error("Response Data:", error.response.data);
              dispatch(updateUserError(error.response.data.message))
              console.error("Response Status:", error.response.status);
              console.error("Response Headers:", error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received from server:", error.request);
              dispatch(updateUserError(error.request))
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Request setup error:", error.message);
              dispatch(updateUserError(error.message))
            }
        }
      }
    //   console.log(currentUser)
      const goback = ()=>{
        navigate("/profile")
      }
      
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center text-orange-700 my-2'>
               Update Profile
            </h1>
            {error && (<p className='text-red-500 text-center m-5'>{error}</p>)}
            {updateDone?(<p className='text-green-500 text-center m-5'>User Updated</p>):""}
            <form className='flex flex-col gap-4' onClick={handleSubmit}>
                <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/.*" onClick={(e)=>{e.stopPropagation()}} />
                <img src={formData.avatar || currentUser.user?.avatar || currentUser.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="profile-img" onClick={()=>fileRef.current.click()}
                     className='rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer'/>

                <p className='text-center'>
                    {fileUploadError ? (
                        <span className='text-red-700'>Error in Uploading the Image</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 && updateDone? (
                        <span className='text-green-700'>Image uploaded successfully</span>
                    ) : ""}
                </p>

                <input type="text" placeholder='Username' className='rounded-lg border p-3' 
                    id="username" defaultValue={currentUser.user?.username || currentUser.username} onChange={handleChange} onClick={(e)=>e.stopPropagation()} />
                <input type="email" placeholder='Email' className='rounded-lg border p-3 ' 
                    id="email" defaultValue={currentUser.user?.email || currentUser.email} onChange={handleChange} onClick={(e)=>e.stopPropagation()}/>
                <input type="password" placeholder='Password' className='rounded-lg border p-3' 
                    id="password" onChange={handleChange} onClick={(e)=>e.stopPropagation()}/>
                <button className='rounded-lg bg-blue-700 uppercase p-3 text-white hover:opacity-80 disabled:opacity:60'>
                    Update</button>
            </form>
            <p className="text-red-600 mt-1 font-semibold cursor-pointer" onClick={goback}>Back</p>
        </div>
    )
}