import React, { startTransition, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from 'swiper';
import {Navigation} from "swiper/modules";
import "swiper/css/bundle";

/**
* @author
* @function ListingPage
**/

export const ListingPage = () => {
  SwiperCore.use([Navigation]);  
  const params = useParams();
  const listingID = params.listingID;
  const [details,setDetails] = useState();
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    const fetchListing = async ()=>{
      try {
        setLoading(true);
        const fetchResponse = await axios.get(`http://localhost:8000/api/v1/listings/get-listing-detail/${listingID}`);
        const fetchData = fetchResponse.data;
        if(!fetchData.success){
          setError(true);
          setLoading(false);
        }
        setTimeout(() => {
          setDetails(fetchData.listing);
        }, 500);
        setLoading(false);
        setError(false)
      } catch (error) {
        setError(true);
        setLoading(false)
      }
      
    };
    fetchListing();
  },[listingID]);

  
  console.log(details);
  return(
    <main>
      {loading && <p className='text-center text-3xl my-2'>Loading...</p>}
      {error && <p className='text-center text-3xl my-2'>Something Went Wrong...</p>}
      {details && !loading && !error && (
        <Swiper navigation>
          {details.imageUrl.map(url=>
          <SwiperSlide key={url}>
            <div className='h-[600px]' style={{background:`url(${url}) center no-repeat`, backgroundSize: "cover"}}></div>
          </SwiperSlide>)}
        </Swiper>
      )
      }
     
    </main>
   )
}