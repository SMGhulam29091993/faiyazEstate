import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Swiper,SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import SwiperCore from "swiper";
import {Navigation} from "swiper/modules";
import ListingCard from "../component/ListingCard";

export const HomePage = ()=>{
  SwiperCore.use([Navigation]);
  const [offerListing,setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing,setSaleListing] = useState([]);

  useEffect(()=>{
    const fetchOfferListing = async ()=>{
      try {
        const res = await axios.get(`https://faiyazestate.onrender.com/api/v1/listings/get?offer=true&limit=4`);
        const responseData = res.data;
        console.log("offer",responseData);
        setOfferListing(responseData.listings);
        fetchRentListing()
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async ()=>{
      try {
        const res = await axios.get(`https://faiyazestate.onrender.com/api/v1/listings/get?type=rent&limit=4`);
        const responseData = res.data;
        console.log("rent",responseData);
        setRentListing(responseData.listings);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListing = async ()=>{
      try {
        const res = await axios.get(`https://faiyazestate.onrender.com/api/v1/listings/get?type=sale&limit=4`);
        const responseData = res.data;
        console.log("Sale",responseData);
        setSaleListing(responseData.listings)
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListing();
  },[])
  

    return (
        <>
            {/* top */}
            <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
              <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                Find your next <span className='text-slate-500'>Perfect</span>
                <br/>
                place with ease
              </h1>
              <div className='text-slate-500 text-xs sm:text-sm'>
                Faiyaz Estate will help you find your next home faster, easier, and with more comfy.
                <br/>
                Our experts supports are easily reachable.
              </div>
              <Link to={"/search"} className='text-xs sm:text-sm font-bold text-blue-600 hover:underline'>
                Let's get start now...
              </Link>
            </div>
 
            {/* swiper */}
            <Swiper navigation>
              {offerListing && offerListing.length > 0 && offerListing.map(listing=>(
                <SwiperSlide  key={listing._id} >
                  <div className='h-[500px]'style={{background:`url(${listing.imageUrl[0]}) center no-repeat`, backgroundSize:"cover"}}></div>
                </SwiperSlide>
              ))}

            </Swiper>



            {/* listing result for offer, sale and rent */}
            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
                  {offerListing && offerListing.length > 0 && (
                    <div className=''>
                      <div className='my-3'>
                        <h2 className='font-semibold text-slate-600 text-2xl'>Recent Offers</h2>
                        <Link className="text-blue-800 text-sm hover:underline" to={"/search?offer=true"}>
                          Search more offers...
                        </Link>
                      </div>
                      <div className='flex flex-wrap gap-4'>
                        {
                          offerListing.map(listing=><ListingCard key={listing._id} listingDetail={listing}/>)
                        }
                      </div>
                    </div>

                  )}
                  {rentListing && rentListing.length > 0 && (
                    <div className=''>
                      <div className='my-3'>
                        <h2 className='font-semibold text-slate-600 text-2xl'>Recent Places for Rent</h2>
                        <Link className="text-blue-800 text-sm hover:underline" to={"/search?offer=true"}>
                          Search more places for rent...
                        </Link>
                      </div>
                      <div className='flex flex-wrap gap-4'>
                        {
                          rentListing.map(listing=><ListingCard key={listing._id} listingDetail={listing}/>)
                        }
                      </div>
                    </div>

                  )}
                  {saleListing && saleListing.length > 0 && (
                    <div className=''>
                      <div className='my-3'>
                        <h2 className='font-semibold text-slate-600 text-2xl'>Recent Places for Sale</h2>
                        <Link className="text-blue-800 text-sm hover:underline" to={"/search?offer=true"}>
                        Search more places for sale...
                        </Link>
                      </div>
                      <div className='flex flex-wrap gap-4'>
                        {
                          saleListing.map(listing=><ListingCard key={listing._id} listingDetail={listing}/>)
                        }
                      </div>
                    </div>

                  )}
            </div>

        </>
    )
}