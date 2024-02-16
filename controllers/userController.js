const Users = require("../models/user");
const bcryptjs = require("bcryptjs");
const  errorHandler  = require("../utils/error")
const jwt  = require("jsonwebtoken");
const Listing = require("../models/listingModel");
require("dotenv").config();

module.exports.register = async (req,res,next)=>{
    const {username, email, password} = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const existingUser = await Users.findOne({email});
        if(existingUser){
            res.status(200).send({message : "User already Exists", success : false})
        }
        const user  = await Users.create({username, email, password : hashedPassword });
        res.status(200).send({message : "User register successfuly", success : true})
    } catch (error) {
        // res.status(404).send({message : "Error in resgistering the user", success :false});
        // console.log(`Register :  ${error.message}`);
        next(error);
    }
};

module.exports.createSession = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        const isPassword = bcryptjs.compareSync(password, user.password);

        if (!isPassword) {
            return res.status(401).send({ message: "Invalid username/password", success: false });
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;

        res.cookie("jwtToken", token, { httpOnly: true, domain:"localhost:8000", path:"/" })
            .status(200)
            .send({ message: "User Logged-In successfully", success: true, user: rest, token });
    } catch (error) {
        next(error);
    }
};


module.exports.googleAuth = async (req,res,next)=>{
    const {email, username, photo}= req.body;
    try {
        const user = await Users.findOne({email});
        if(user){
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
            const {password : pass, ...rest} = user._doc;
            res
                .cookie("jwtToken", token, { httpOnly: true, domain:"localhost:8000", path:"/" })
                .status(200)
                .send({message : "User Logged-In Successfully", success : true, user : rest, token})
        }else{
            const generatePassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword,10);
            const newUser = await Users.create({email, 
                                username : username.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                                                 password : hashedPassword, 
                                                 avatar : photo, });
            const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET);
            const {password : pass, ...rest} = newUser._doc;
            res
                .cookie("jwtToken", token, { httpOnly: true, domain:"localhost:8000", path:"/" })
                .status(200)
                .send({message : "User Logged-In Successfully", success : true, user : rest, token})
        }
    } catch (error) {
        next(error)
    }
};

module.exports.updateUser = async (req,res,next)=>{
    console.log("Request Headers:", req.headers);
    const userId = req.params.id;
    if(req.user.id !== userId){
        res.status(401).send({message:"You are not authorized", success: false});
        return;
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await Users.findByIdAndUpdate(userId, {
            $set:{
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar
            }
        }, {new:true})

        const {password ,...rest} = updatedUser._doc;
        res.status(200).send({message : "User Details Updated", success: true, user : rest})

    } catch (error) {
        next(error)
    }
};

module.exports.destroyUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        res.status(401).send({message: "You are not authrised to delete", success: false});
        return;
    };
    try {
        const userId = req.params.id;
        await Users.findByIdAndDelete(userId);
        res.status(200).send({message:"User Deleted Successfully!", success : true});
    } catch (error) {
        next(error);
    }
};

module.exports.destroySession = (req, res, next) => {
    try {
        // Set the "jwtToken" cookie with an expiration in the past
        res.cookie("jwtToken", "", { httpOnly: true });
        res.status(200).send({ message: "User Log-out successfully", success: true, user: null });
    } catch (error) {
        next(error);
    }
};


module.exports.getUserListings = async (req,res,next)=>{
    if(req.user.id === req.params.id){
        try {
            const listings = await Listing.find({userRef : req.params.id});
            if(!listings){
                res.status(403).send({message : "No Listing Created Yet !!", success : false});
                return;
            }
            res.status(200).send({message:"Here is Your Listings", success : true, listings});
        } catch (error) {
            next(error);
        }
    }else{
        res.status(401).send({message: "You are not authorized to view this !!", success : false})
        return;
    }
};

module.exports.getUser = async (req,res,next)=>{
    try {
        const userDetails = await Users.findById(req.params.id);
        if(!userDetails){
            res.status(401).send({message : "User Details not Found!!", success : false});
            return;
        } 
        const {password : pass, ...rest} = userDetails._doc;
        res.status(200).send({message : "The Details are received", success : true, user : rest})

    } catch (error) {
        next(error);
    }
}