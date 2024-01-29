import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {auth}  from '../firbase-init';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {signInSuccess, token} from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom';

const OAuth = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleAuth= async ()=>{
        
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth,provider);
            // console.log("Google SignIn : " ,result);
            const googleData = {
                username : result.user.displayName,
                email : result.user.email,
                photo : result.user.photoURL
            }
            const res = await axios.post("http://localhost:8000/api/v1/user/googleAuth",googleData );
            const responseData = res.data;
            
            dispatch(signInSuccess(responseData));
            dispatch(token(responseData.token))
            console.log(responseData)
            navigate("/")
        } catch (error) {
            console.log(`Cannot sign-in with Google ${error}`);
        }
    }

    return (
        <>
            <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90'
                type="button" onClick={handleGoogleAuth}>Continue With Google</button>
        </>
    )
}


export default OAuth;