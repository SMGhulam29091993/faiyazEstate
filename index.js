const express = require("express");
require("dotenv").config()
const bodyParser = require("body-parser");
require("colors");
const morgan = require("morgan");
const cors = require("cors");
PORT = 8000 || process.env.PORT;
const db = require("./config/mongoose");
const errorMiddleware = require("./config/errorHandlingMiddleware.js")
const cookieParser = require("cookie-parser");


// rest
const app = express();


// middleware
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : false}))
app.use(morgan("dev"));

app.use(errorMiddleware);






app.use("/", require("./routes"));



app.listen(PORT, (err)=>{
    if(err){console.log("Error in running the server".bgRed);};
    console.log(`The server is up and running on PORT : ${PORT}`.bgYellow );
})