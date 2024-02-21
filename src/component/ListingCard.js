import React from 'react';
import { Link } from 'react-router-dom';
import {FaMapMarkedAlt} from 'react-icons/fa'


const ListingCard = ({listingDetail})=>{
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px]'>
            <Link to={`/listing/${listingDetail._id}`}>
                <img src={listingDetail.imageUrl[0]} alt="listing-cover" 
                className='h-[220px] sm:h-[140px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='truncate text-lg text-slate-700 font-semibold'>{listingDetail.name}</p>
                    <div className='flex gap-1 items-center'>
                        <FaMapMarkedAlt className='h-4 w-4 text-green-700'/>
                        <p className='text-sm text-slate-700 truncate w-full'>{listingDetail.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-2'>{listingDetail.description}</p>
                    <p className='text-slate-600 font-semibold mt-2'>Rs {listingDetail.offer?listingDetail.discountedPrice.toLocaleString('en-US') 
                            : listingDetail.regularPrice.toLocaleString('en-US')}{listingDetail.type === 'rent' && '/month' }</p>
                    <div className='flex items-center gap-4'>
                        <div className='text-xs text-slate-700 font-bold flex gap-1'>
                            <span>{listingDetail.bathrooms}</span>
                            <span>{listingDetail.bathrooms > 1 ?"Baths":"Bath"}</span>
                        </div>
                        <div className='text-xs text-slate-700 font-bold flex gap-1'>
                            <span>{listingDetail.bedrooms}</span>
                            <span>{listingDetail.bedrooms > 1 ?"Beds":"Bed"}</span>
                        </div>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}

export default ListingCard;