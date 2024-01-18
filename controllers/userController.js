const Users = require("../models/user")

module.exports.register = async (req,res)=>{
    try {
        const user = await Users.create(req.body);
        res.status(200).send({message : "User register successfuly", success : true})
    } catch (error) {
        res.status(404).send({message : "Error in resgistering the user", success :false});
        console.log(`Register :  ${error}`);
    }
}