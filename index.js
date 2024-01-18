const express = require("express");
require("dotenv").config()
const bodyParse = require("body-parser");
require("colors");
const morgan = require("morgan");
const cors = require("cors");
PORT = 8000 || process.env.PORT;

// rest
const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended : false}))
app.use(morgan("dev"));



app.listen(PORT, (err)=>{
    if(err){console.log("Error in running the server".bgRed);};
    console.log(`The server is up and running on PORT : ${PORT}`.bgCyan );
})