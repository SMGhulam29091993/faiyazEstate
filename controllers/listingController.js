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
};

module.exports.updateListing = async (req,res, next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        res.status(404).send({message : "Listing you are try ing to update not found!!", success : false})
        return;
    }
    if(req.user.id !== listing.userRef){
        res.status(401).send({message : "Not Authorized to update the listing!!", success : false});
        return;
    }
    try {
        const updateListng = await Listing.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).send({message : "Listing updated successfully", success : true, listings : updateListng})
    } catch (error) {
        next(error);
    }
};

module.exports.getListingDetails = async (req,res,next)=>{
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            res.status(404).send({message : "Could not find the listing", success : false});
            return;
        }
        res.status(200).send({message : "Here is your listings", success : true, listing});
    } catch (error) {
        next(error)
    }
};

module.exports.get_listings = async (req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex)|| 0;

        let offer = req.query.offer;
        if(offer === undefined || offer === 'false'){
            offer = {$in:[true,false]};
        }

        let furnished = req.query.furnished;
        if(furnished === undefined || furnished=== 'false'){
            furnished = {$in:[true,false]};
        }

        let parking = req.query.parking;
        if(parking === undefined || parking === 'false'){
            parking = {$in:[true,false]};
        }

        let type = req.query.type;
        if(type === undefined || type === 'all'){
            type = {$in:['sale', 'rent']};
        }

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || "desc";

        const listings = await Listing.find({
            name : {$regex : searchTerm, $options : 'i'},
            offer, 
            furnished,
            parking,
            type
        }).sort({[sort] : order}).limit(limit).skip(startIndex);

        if(listings.length === 0){
            res.status(401).send({message : "No Listing Found", success : false});
            return;
        }
        res.status(200).send({message : "Here are your listings", success : true, listings});
    } catch (error) {
        next(error);
    }
}