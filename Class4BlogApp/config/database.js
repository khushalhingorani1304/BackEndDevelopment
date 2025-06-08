const mongoose = require("mongoose")

require("dotenv").config();

const DB_URL = process.env.DATABASE_URL;

const dbConnect=()=>{
    mongoose.connect(DB_URL)
    .then(()=>{
        console.log("Database Connected Successfully");
    })
    .catch((err)=>{
        console.log("Error Occured While Connecting DataBase :",err.message);
        process.exit(1);
    })
}


module.exports = dbConnect;