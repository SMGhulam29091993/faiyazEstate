const express = require("express");
const router = express.Router();
const listingController = require("../../../controllers/listingController.js");
const {verifyUser} = require("../../../utils/verifyUser.js")

router.post("/create-list", verifyUser, listingController.createList)


module.exports= router;