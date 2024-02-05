import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { userSelector } from "../redux/user/userSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firbase-init";
import {useNavigate} from "react-router-dom"

export const CreateList = ()=>{
    const [file,setFile] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const {token,currentUser} = useSelector(userSelector);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        imageUrl : [],
        name: "",
        description : "",
        address : "",
        type: "rent",
        bedrooms : 1,
        bathrooms : 1,
        regularPrice :100,
        discountedPrice : 0,
        offer : false,
        parking : false,
        furnished : false,
        userRef : currentUser._id
    });

    const handleUpload = () => {      
        if (file.length > 0  && file.length + formData.imageUrl.length < 7 ) {
            setUploading(true);
            setImageUploadError(null)
            const promises = []
            for (let i = 0; i < Math.min(6, file.length); i++) {
              console.log(file[i].path);
              promises.push(storeImage(file[i]));
            };
            Promise.all(promises).then((url)=>{
                setFormData({
                    ...formData,
                    imageUrl : formData.imageUrl.concat(url)
                })
                setImageUploadError(null);
                setUploading(false);
            }).catch((err)=>{
                setImageUploadError("Image upload failed (2 mb max)")
                setUploading(false);
            })
        } else{
            setImageUploadError("You can only upload 6 image per listing!!");
            setUploading(false);
        }
    };
      
    const storeImage =  (file)=>{
        return new Promise((resolve, reject)=>{
            const filename = new Date().getTime() +"-"+ file.name ;
            const storageRef = ref(storage,filename);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(`Upload is ${progress}% done.`);
                },
                (error)=>{
                    reject(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleChange = (e)=>{
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type : e.target.id
            })
        };
        if(e.target.id === 'furnished' || e.target.id === 'parking' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        };
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.value
            })
        }
    };

    const handleFormSubmit = async (e)=>{
        e.preventDefault();      
        try {
            if(formData.imageUrl.length < 1) {
                setError("You must Upload atleast one image!!");
                return;
            }
            if (+formData.regularPrice < +formData.discountedPrice){
                setError("Discount price must be lesser than the regular price !!");
                return;
            }

            setLoading(true);
            setError(null);
            const res = await axios.post("http://localhost:8000/api/v1/listings/create-list", formData, {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });
            const responseData = res.data;
            console.log(responseData);
            if (!responseData.success) {
                throw new Error(responseData.message);
            }
            setLoading(false);
            setError(null);
            navigate(`/listing/${responseData.listing._id}`)
            
        } catch (error) {
            if(error.response){
                console.error(`Error in creating listing response : ${error.response.data.message}`);
                setError(error.response.data.message)
            }else if(error.request){
                console.error(`Error in the creating listing request ${error.request}`);
                setError(error.request)
            }else{
                console.error(`Error in creating the listing message ${error.message}`);
                setError(error.message)
            }
        }
    }

    const removeImage = (index)=>{
        setFormData({
            ...formData,
            imageUrl : formData.imageUrl.filter((_,i)=> i !== index)
        })
    }

    console.log(formData);
    return (
        <>
            <main className="p-3 max-w-4xl mx-auto">
                <h1 className="text-3xl text-orange-700 text-center my-2">Create Listing</h1>
                <form className="flex flex-col sm:flex-row my-7 gap-6 " encType="multipart/form-data" onSubmit={handleFormSubmit}>
                    
                    <div className="flex flex-col gap-4 flex-1">
                    {error?(<p className="text-red-800 text-center">{error}</p>):""}
                        <input type="text" placeholder="Name" id="name" maxLength="62" minLength="10" className="p-3 rounded-lg border" value={formData.name} onChange={handleChange} required/>
                        <textarea placeholder="Description" id="description" className="p-3 rounded-lg border"  value={formData.description} onChange={handleChange} required/>
                        <input type="text" placeholder="Address" id="address"  className="p-3 rounded-lg border" value={formData.address} onChange={handleChange} required/>
                        <div className="flex gap-4 flex-wrap">
                            <div className="flex gap-2">
                                <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={formData.type==='sale'}/>
                                <span>Sell</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={formData.type==='rent'} />
                                <span>Rent</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={formData.parking} />
                                <span>Parking Spot</span>
                            </div>                     
                            <div className="flex gap-2">
                                <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={formData.furnished} />
                                <span>Furnished</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="offer" className="w-5"  onChange={handleChange} checked={formData.offer} />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-4">
                                <input type="number" id="bedrooms" min="1" max="10" required className="p-2 border border-gray-300 rounded-lg " value={formData.bedrooms} onChange={handleChange} />
                                <p>Beds</p>    
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="number" id="bathrooms" min="1" max="10" required className="p-2 border border-gray-300 rounded-lg "  value={formData.bathrooms} onChange={handleChange}/>
                                <p>Bath</p>    
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="number" id="regularPrice" min="100" max="100000000"  required className="p-2 border border-gray-300 rounded-lg " value={formData.regularPrice} onChange={handleChange} />
                                <div  className="flex flex-col items-center">
                                    <p>Regular Price</p>
                                    {formData.type==="sale"?"":(
                                        <span className="text-xs">(Rs per month)</span>
                                    )} 
                                    
                                </div>
                            </div>
                            {formData.offer?(
                                <div className="flex items-center gap-4">
                                    <input type="number" id="discountedPrice" min="0" max="100000000" required className="p-2 border border-gray-300 rounded-lg " value={formData.discountedPrice} onChange={handleChange} />
                                    <div className="flex flex-col items-center">
                                        <p>Discounted Price</p> 
                                        {formData.type==="sale"?"":(
                                            <span className="text-xs">(Rs per month)</span>
                                        )} 
                                    </div>
                                </div>
                            ):""}
                            
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
                            <input type="file" id="imageUrl" accept="image/.*" multiple className="p-3 border border-gray-300 rounded"  onChange={(e) => setFile(e.target.files)} />
                            <button type="button" className="p-3 text-white bg-blue-600 border border-blue-600 rounded uppercase hover:shadow-lg disabled:opacity-80"
                             onClick={handleUpload} disabled={uploading} >
                                {uploading?"Uploading":"Upload"}
                            </button>                            
                        </div>
                        <p className="text-red-700">{imageUploadError && imageUploadError}</p>
                        {formData.imageUrl.length>0 && formData.imageUrl.map((url, i)=>(
                            (
                            <div key={url} className="flex justify-between items-center p-3 border">
                                <img src={url} alt="listing" className="w-20 h-20 object-contain rounded-lg" />
                                <button type="button" className="text-white bg-red-700 p-1 rounded-lg hover:opacity-75" onClick={()=>removeImage(i)}>Delete</button>
                            </div>
                            )
                        ))}
                        <button className="p-3 bg-green-700 uppercase text-white rounded-lg hover:opacity-90 disabled:opacity-60" disabled={loading || uploading} >
                            {loading?"Creating":"Create Listing"}
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}