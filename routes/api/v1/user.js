const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/userController.js");
const { verifyUser } = require("../../../utils/verifyUser.js");


router.get("/test", (req,res)=>{
    res.status(200).send({message : "The Backend is working!!"})
})
router.post("/sign-up", userController.register );
router.post("/sign-in", userController.createSession);
router.post("/googleAuth", userController.googleAuth);
router.put("/update/:id",verifyUser, userController.updateUser);
router.delete("/delete/:id", verifyUser, userController.destroyUser);
router.get("/sign-out",verifyUser, userController.destroySession);
router.get("/get-listing/:id", verifyUser, userController.getUserListings);
router.get("/:id",userController.getUser);

module.exports = router;