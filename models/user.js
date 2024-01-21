const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : "https://www.istockphoto.com/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-gm1495088043-518213332"
    },
}, {timestamps : true});

const Users = mongoose.model("User", userSchema);

module.exports = Users;