import React from 'react'

/**
* @author
* @function SearchPage
**/

export const SearchPage = (props) => {
  return(
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 min-h-screen'>
            <form className='flex flex-col gap-8 '>
                <div className='flex items-center gap-1'>
                    <label className='whitespace-nowrap font-semibold'>Search Term : </label>
                    <input type='text' id="searchTerm" placeholder='Search...' className='border rounded-lg p-3 w-full' />
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <label className='font-semibold'>Type : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5' />
                        <span >Rent&Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='Rent' className='w-5' />
                        <span >Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='Sale' className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='Offer' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <label className='font-semibold'>Amenities : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <label className='font-semibold'>Sort : </label>
                    <select id='select_order' className='border rounded-lg p-3'>
                        <option>None</option>
                        <option>Price hight to low</option>
                        <option>Price low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className='bg-blue-600 p-3 text-white rounded-lg uppercase hover:opacity-90'>Search</button>
            </form>
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b-2 p-3 text-slate-700'>Listing Result : </h1>
        </div>
    </div>
   )
}