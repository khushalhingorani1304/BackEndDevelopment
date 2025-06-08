 const mongoose = require("mongoose")

 require("dotenv").config();

 const DB_URL = process.env.DATABASE_URL;
 
 
 const dbConnect = () =>{
     mongoose.connect(DB_URL)
    .then(()=>{console.log("DB Connected Successfully!!!");})
    .catch((error)=>{
        console.log("Error Occured While Connecting DB",error.message);
        process.exit(1);
    })
 }

 module.exports = dbConnect;