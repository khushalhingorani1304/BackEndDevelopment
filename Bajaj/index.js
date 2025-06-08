const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const bajajRoutes = require("./routes/bajaj");

// mount the todo api routes
// app.use("/Flex-it-Out/", bajajRoutes);

app.listen(PORT, () => {
    console.log(`Server Started Successfully at ${PORT}`);
  });


// const dbConnect = require("./config/database");
// dbConnect();


app.get("/",(req,res)=>{
    res.send("Hello!!!!!!");
})