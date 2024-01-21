import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {userSelector} from "../redux/user/userSlice"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firbase-init';


export const UpdateProfile = ()=>{
    const {currentUser} = useSelector(userSelector)
    const fileRef = useRef(null);
    const [file,setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError,setFileUploadError] = useState(false);
    const [formData,setFormData] = useState({});
    console.log(formData)
    console.log(file);

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
      

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center text-orange-700 my-2'>
                Update Profile
            </h1>
            <form className='flex flex-col gap-4'>
                <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/.*" />
                <img src={formData.avatar || currentUser.user.avatar} alt="profile-img" onClick={()=>fileRef.current.click()}
                     className='rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer'/>

                <p className='text-center'>
                    {fileUploadError ? (
                        <span className='text-red-700'>Error in Uploading the Image</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-700'>Image uploaded successfully</span>
                    ) : ""}
                </p>

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