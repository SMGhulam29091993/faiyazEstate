import React from "react";

export const CreateList = ()=>{
    return (
        <>
            <main className="p-3 max-w-4xl mx-auto">
                <h1 className="text-3xl text-orange-700 text-center my-2">Create Listing</h1>
                <form className="flex flex-col sm:flex-row my-7 gap-6 " encType="multipart/form-data">
                    <div className="flex flex-col gap-4 flex-1">
                        <input type="text" placeholder="Name" id="name" maxLength="62" minLength="10" className="p-3 rounded-lg border" required/>
                        <textarea type="text" placeholder="Description" id="description" className="p-3 rounded-lg border" required/>
                        <input type="text" placeholder="Address" id="address"  className="p-3 rounded-lg border" required/>
                        <div className="flex gap-4 flex-wrap">
                            <div className="flex gap-2">
                                <input type="checkbox" id="sale" className="w-5" />
                                <span>Sell</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="rent" className="w-5" />
                                <span>Rent</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="parking" className="w-5" />
                                <span>Parking Spot</span>
                            </div>                     
                            <div className="flex gap-2">
                                <input type="checkbox" id="furnished" className="w-5" />
                                <span>Furnished</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="offer" className="w-5" />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-4">
                                <input type="number" id="bedrooms" min="1" max="10" required className="p-2 border border-gray-300 rounded-lg " />
                                <p>Beds</p>    
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="number" id="bathrooms" min="1" max="10" required className="p-2 border border-gray-300 rounded-lg " />
                                <p>Bath</p>    
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="number" id="regularPrice"  required className="p-2 border border-gray-300 rounded-lg " />
                                <div  className="flex flex-col items-center">
                                    <p>Regular Price</p> 
                                    <span className="text-xs">(Rs per month)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="number" id="discountedPrice"  required className="p-2 border border-gray-300 rounded-lg " />
                                <div className="flex flex-col items-center">
                                    <p>Discounted Price</p> 
                                    <span className="text-xs">(Rs per month)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-4">
                        <p className="font-semibold">
                            Images :
                            <span className="font-normal text-gray-500 ml-2">
                                The first will be the cover (max 6)
                            </span>
                        </p>
                        <div className="flex justify-center gap-4">
                            <input type="file" id="images" accept="image/*" multiple className="p-3 border border-gray-300 rounded" />
                            <button className="p-3 text-white bg-blue-600 border border-blue-600 rounded uppercase hover:shadow-lg disabled:opacity-80" >Submit</button>                            
                        </div>
                        <button className="p-3 bg-green-700 uppercase text-white rounded-lg hover:opacity-90 disabled:opacity-60">Create Listing</button>
                    </div>
                    
                </form>
            </main>
        </>
    )
}