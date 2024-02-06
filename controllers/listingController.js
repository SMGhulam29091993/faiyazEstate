const Listing = require("../models/listingModel.js");

module.exports.createList = async (req,res,next)=>{
    try {
        const listing = await Listing.create(req.body);
        res.status(200).send({message : "List Created Successfullty", success : true, listing});
    } catch (error) {
        next(error);
    }
};

module.exports.deleteList = async (req,res,next)=>{
    const listings = await Listing.findById(req.params.id);
    if(!listings){
        res.status(401).send({message:"Sorry Listing Not Found", success : false});
        return;
    }
    if(req.user.id !== listings.userRef){
        res.status(401).send({message:"You are not authorized to delete this Listing", success : false});
        return;
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).send({message:"Listing Deleted !!", success : true});
    } catch (error) {
        next(error);
    }
    
}