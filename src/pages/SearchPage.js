import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../component/ListingCard';

/**
* @author
* @function SearchPage
**/

export const SearchPage = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarData,setSideBarData] = useState({
        searchTerm : "", type : "all", parking :false, furnished : false, offer : false, order : "desc", sort : "created_at"
    });
    const [loading,setLoading] = useState(false);
    const [listing,setListing] = useState();

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        const typeFromURL = urlParams.get('type');
        const furnishedFromURL = urlParams.get('furnished');
        const parkingFromURL = urlParams.get('parking');
        const offerFromURL = urlParams.get('offer');
        const sortFromURL = urlParams.get('sort');
        const orderFromURL = urlParams.get('order');
        if(searchTermFromURL || typeFromURL || furnishedFromURL || parkingFromURL || offerFromURL || sortFromURL || orderFromURL){
            setSideBarData({
                searchTerm : searchTermFromURL || "", 
                type : typeFromURL || "all", 
                offer : offerFromURL === 'true'?true:false, 
                furnished : furnishedFromURL === 'true'?true:false, 
                parking : parkingFromURL === 'true'?true:false, 
                sort : sortFromURL || "created_at", 
                order : orderFromURL || "desc"
            })
        }
        const fetchListings = async ()=>{
            setLoading(true);
            try {
                const searchQuery = urlParams.toString();
                const res = await axios.get(`http://localhost:8000/api/v1/listings/get?${searchQuery}`);
                const responseData = res.data;
                // if(responseData.listings.length === 0){
                //     console.log("No Listing Found");
                // }
                
                await setListing(responseData.listings);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchListings();
    },[location.search]);

    console.log(listing);

    const handleChange = (e)=>{
        if(e.target.id === 'searchTerm'){
            setSideBarData({
                ...sidebarData,
                [e.target.id] : e.target.value
            })
        }
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSideBarData({
                ...sidebarData,
                type : e.target.id
            })
        }   
        if(e.target.id === 'furnished' || e.target.id === 'parking' || e.target.id === 'offer'){
            setSideBarData({
                ...sidebarData,
                [e.target.id] : e.target.checked || e.target.checked === 'true'? true : false
            })
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split("_")[0] || "created_at";
            const order = e.target.value.split("_")[1] || "desc";
            setSideBarData({...sidebarData, sort,order})
        }     
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('offer',sidebarData.offer);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished',sidebarData.furnished);
        urlParams.set('sort',sidebarData.sort);
        urlParams.set('order',sidebarData.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

    }
  return(
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 '>
                <div className='flex items-center gap-1'>
                    <label className='whitespace-nowrap font-semibold'>Search Term : </label>
                    <input type='text' id="searchTerm" placeholder='Search...' className='border rounded-lg p-3 w-full' value={sidebarData.searchTerm} onChange={handleChange} />
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <label className='font-semibold'>Type : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' checked={sidebarData.type==="all"} onChange={handleChange}/>
                        <span >Rent&Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' checked={sidebarData.type==="rent"} onChange={handleChange}/>
                        <span >Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' checked={sidebarData.type==="sale"} onChange={handleChange}  />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' checked={sidebarData.offer} onChange={handleChange} />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <label className='font-semibold'>Amenities : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' checked={sidebarData.parking} onChange={handleChange}/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' checked={sidebarData.furnished} onChange={handleChange} />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <label className='font-semibold'>Sort : </label>
                    <select id='sort_order' className='border rounded-lg p-3' onChange={handleChange} defaultValue={'created_at_desc'}>
                        <option>None</option>
                        <option value={'regularPrice_desc'}>Price hight to low</option>
                        <option value={'regularPrice_asc'}>Price low to high</option>
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
                </div>
                <button className='bg-blue-600 p-3 text-white rounded-lg uppercase hover:opacity-90'>Search</button>
            </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b-2 p-3 text-slate-700'>Listing Result : </h1>
            <div className='p-7 flex flex-wrap gap-4'>
                {loading && <p className='text-center text-3xl text-slate-800 w-full'>Loading...</p>}
                {!loading && listing?.length === 0 && (<p className=' w-full text-center text-2xl text-red-800'>No Listing Found!!</p>)}
                {!loading && listing && listing.map(detail=><ListingCard key={detail._id} listingDetail={detail}/>)}
            </div>
        </div>
    </div>
   )
}