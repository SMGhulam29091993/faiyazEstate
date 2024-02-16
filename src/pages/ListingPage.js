import React, {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from 'swiper';
import {Navigation} from "swiper/modules";
import "swiper/css/bundle";
import {FaBath, FaBed, FaChair, FaMapMarkedAlt, FaParking, FaShare} from "react-icons/fa"
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';
import Contact from '../component/Contact';

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
  const [copied,setCopied] = useState(false);
  const [contact,setContact] = useState(false);
  const {currentUser} = useSelector(userSelector);

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
        <>
          <Swiper navigation>
            {details.imageUrl.map(url=>
            <SwiperSlide key={url}>
              <div className='h-[600px]' style={{background:`url(${url}) center no-repeat`, backgroundSize: "cover"}}></div>
            </SwiperSlide>)}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare className='text-slate-500' 
              onClick={()=>{
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(()=>{
                  setCopied(false);
                },2000);                
            }}/>
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[3%] z-10 rounded-md bg-slate-100 p-2'>Link-Copied!!</p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {details.name} - Rs{' '}
              {details.offer?details.discountedPrice.toLocaleString('en-US'):details.regularPrice.toLocaleString('en-US')}
              {details.type === 'rent' && '/month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-md'>
              <FaMapMarkedAlt className='text-green-700'/>
              {details.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {details.type === 'rent'? 'For Rent' : "For Sale"}
              </p>
              {details.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md' >
                  Rs {+details.regularPrice - +details.discountedPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
                <span className='font-semibold text-black'>Description - </span>
                {details.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg'/>
                {details.bedrooms > 1?`${details.bedrooms} beds`:`${details.bedrooms} bed`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg'/>
                {details.bathrooms > 1?`${details.bathrooms} baths`:`${details.bathrooms} bath`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg'/>
                {details.parking? 'Parking Available' : "No Parking"}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg'/>
                {details.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && details.userRef !== currentUser._id && !contact &&(
              <button onClick={()=>setContact(true)} className='bg-blue-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={details}/>}
          </div>
        </>
      )}
    </main>
   )
}