import React, { useEffect } from 'react';
import axios from "axios";

export const HomePage = ()=>{
    useEffect(()=>{
        const res = axios.get("http://localhost:8000/api/v1/test");
        console.log(res.data);
    },[])
    return (
        <>
            <h1 className='text-3xl text-center  text-orange-700'>
                HomePage
            </h1>

        </>
    )
}