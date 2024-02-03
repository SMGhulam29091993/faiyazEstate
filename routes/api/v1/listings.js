const express = require("express");
const router = express.Router();
const listingController = require("../../../controllers/listingController.js");

router.post("/create-list", listingController.createList)

module.exports= router;