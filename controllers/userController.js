const Users = require("../models/user");
const bcryptjs = require("bcryptjs");
const  errorHandler  = require("../utils/error")

module.exports.register = async (req,res,next)=>{
    const {username, email, password} = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const existingUser = await Users.findOne({email});
        if(existingUser){
            res.status(200).send({message : "User already Exists", success : false})
        }
        const user  = await Users.create({username, email, password : hashedPassword});
        res.status(200).send({message : "User register successfuly", success : true})
    } catch (error) {
        // res.status(404).send({message : "Error in resgistering the user", success :false});
        // console.log(`Register :  ${error.message}`);
        next(error);
    }
};

module.exports.createSession = async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        const user = await Users.findOne({email});
        if(!user) return next(errorHandler(404, "User not found ! Please Sign-Up"));
        const isPassword = bcryptjs.compareSync(password, user.password);
        if(!isPassword) return next(errorHandler(401, "Invalid username/password"));
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        const {password : pass, ...rest} = user._doc
        res.cookies("access_toke", token, {httpOnly : true, maxAge : 60*60*1000})
           .status(200)
           .send({message : "User Logged-In successfully", successs : true, user : rest})
    } catch (error) {
        next(error); 
    }
}