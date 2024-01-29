const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/userController.js");
const { verifyUser } = require("../../../utils/verifyUser.js");


router.get("/test", (req,res)=>{
    res.status(200).send({message : "The Backed is Working Fine"})
})
router.post("/sign-up", userController.register );
router.post("/sign-in", userController.createSession);
router.post("/googleAuth", userController.googleAuth);
router.put("/update/:id",verifyUser, userController.updateUser);
router.delete("/delete/:id", verifyUser, userController.destroyUser);
router.get("/sign-out",verifyUser, userController.destroySession);

module.exports = router;