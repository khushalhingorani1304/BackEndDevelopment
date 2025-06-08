// Creating Instance of express
const express = require("express");
const app = express();

// importing dotenv file
require("dotenv").config();

// Extracting Port
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());


// importing Routes;
const blog = require("./routes/blog")
// Mounting a particular path to routes;
app.use("/api/v1", blog);


const dbConnect = require("./config/database");
dbConnect();


// start the server
app.listen(PORT,()=>{
    console.log(`App is started at Port number: ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send(`<h1>This is Homepage Baby</h1>`)
})