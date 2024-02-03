const express = require("express");
const router = express.Router();


router.use("/user", require("./user"));
router.use("/listings", require("./listings.js"));


module.exports = router;