const Users = require("../models/user");
const bcryptjs = require("bcryptjs");

module.exports.register = async (req,res,next)=>{
    const {username, email, password} = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user  = await Users.create({username, email, password : hashedPassword});
        res.status(200).send({message : "User register successfuly", success : true})
    } catch (error) {
        // res.status(404).send({message : "Error in resgistering the user", success :false});
        // console.log(`Register :  ${error.message}`);
        next(error);
    }
}