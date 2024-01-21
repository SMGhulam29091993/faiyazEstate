const Users = require("../models/user");
const bcryptjs = require("bcryptjs");
const  errorHandler  = require("../utils/error")
const jwt  = require("jsonwebtoken");

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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;

        res.cookie("access_toke", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
            .status(200)
            .send({ message: "User Logged-In successfully", successs: true, user: rest });
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
                .cookie("access_token", token, {httpOnly : true, maxAge : 60*60*1000})
                .status(200)
                .send({message : "User Logged-In Successfully", success : true, user : rest})
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
                .cookie("access_token", token, {httpOnly : true, maxAge : 60*60*1000})
                .status(200)
                .send({message : "User Logged-In Successfully", success : true, user : rest})
        }
    } catch (error) {
        next(error)
    }
}