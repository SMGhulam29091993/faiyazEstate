const mongoose = require("mongoose");
require("dotenv").config();

// mongoose.connect("mongodb://127.0.0.1:27017/faiyaz-estate");
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting with the database".bgRed));

db.once("open", ()=>{
    console.log("Connection with the database is established".bgMagenta);
});

module.exports = db;