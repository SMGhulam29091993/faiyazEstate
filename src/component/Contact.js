import React, { useEffect, useState } from 'react'
import axios from "axios";
import emailjs from 'emailjs-com';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';


/**
* @author
* @function Contact
**/

const Contact = ({listing}) => {
    const [landLord,setLandLord] = useState(null);
    const [message,setMessage] = useState("")
    const {currentUser} = useSelector(userSelector);

    useEffect(()=>{
        const fetchLandLord = async ()=>{      
            try {
                const res = await axios.get(`https://faiyazestate.onrender.com/api/v1/user/${listing.userRef}`);
                const responseData = res.data;
                console.log(responseData)
                setLandLord(responseData.user)
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandLord();
    },[listing.userRef]);

    
    const sendEmail = (e) => {
        e.preventDefault();
        const Service_ID = 'service_h5n56ws';
        const Template_ID = 'template_g3r4nrg';
        const User_ID = "LJ5yC_mxqWCaE54T-";
        const templateParams = {
            subject : `Regarding ${listing.name}`,
            from_name: currentUser.username || currentUser.user?.username, // Change to the name of the sender
            to_name: landLord.username, // Change to the name of the recipient
            message_html: message,
            to_email: landLord.email,
            from_email: currentUser.email || currentUser.user?.email,// Set the email address of the sender
        };
        emailjs.send(Service_ID, Template_ID, templateParams, User_ID)
            .then((response) => {
                console.log('Email sent:', response);
                setMessage("")
            })
            .catch((error) => {
                console.error('Email failed to send:', error);
            });
    };
    
  return(
    <div>
        {landLord && (
            <div className='flex flex-col gap-2'>
                 <p>Contact <span className='font-semibold'>{landLord.username}</span> for <span  className='font-semibold'>{listing.name}</span></p>
                 <textarea name="message" 
                            id="message"
                            rows="5" 
                            value={message} 
                            onChange={(e)=>setMessage(e.target.value)}
                            placeholder='Enter Your Message Here!!'
                            className='w-full border border-solid border-black p-3 rounded-lg placeholder:text-black mt-1'
                        />
                <button onClick={sendEmail} className='bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 '>Send Message</button>
            </div>
        )}
    </div>
   )
}

export default Contact;