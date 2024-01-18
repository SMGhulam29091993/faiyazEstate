import React, { useEffect, useState } from 'react';
import axios from "axios";

export const HomePage = ()=>{
    const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/user/test');
        setResponseData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    return (
        <>
            <h1 className='text-3xl text-center  text-orange-700'>
                HomePage
            </h1>
            <p>{responseData && responseData.message ? JSON.stringify(responseData.message) : ""}</p>

        </>
    )
}