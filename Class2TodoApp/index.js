const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;


// middleware to parse json request body
app.use(express.json());


// import routes for TODO api
const todoRoutes = require("./routes/todo");

// mount the todo api routes
app.use("/api/v1", todoRoutes);


// start server
app.listen(PORT, () => {
  console.log(`Server Started Successfully at ${PORT}`);
});


// Connect to DB
const dbConnect = require("./config/database");
dbConnect();

// Default route
app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage Baby</h1>`);
});
