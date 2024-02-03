const Listing = require("../models/listingModel.js");

module.exports.createList = async (req,res,next)=>{
    try {
        const listing = await Listing(req.body);
        res.status(200).send({message : "List Created Successfullty", success : true, listing});
    } catch (error) {
        next(error);
    }
}