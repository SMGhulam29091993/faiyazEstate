const express = require("express");
const router = express.Router();
const listingController = require("../../../controllers/listingController.js");
const {verifyUser} = require("../../../utils/verifyUser.js")

router.post("/create-list", verifyUser, listingController.createList)
router.delete("/delete-listing/:id", verifyUser, listingController.deleteList)
router.post("/update-listing/:id", verifyUser, listingController.updateListing)
router.get("/get-listing-detail/:id", listingController.getListingDetails)
router.get("/get",listingController.get_listings);
module.exports= router;