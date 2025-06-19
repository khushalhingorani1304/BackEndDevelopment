const express = require("express");
const app = express();
require("dotenv").config();

const {connectDb} = require("./config/database");
const {connectCloudinary} = require("./config/cloudinary");


const PORT = process.env.PORT || 3000;


// middlewares
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Db Connect
connectDb();

// cloudinary Connect
connectCloudinary();


// routes mounting
const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload",Upload);

app.listen(PORT,()=>{
    console.log(`App is Running at Port ${PORT}`);
})
