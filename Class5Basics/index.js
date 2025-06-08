const express = require('express');
const app = express();
const port = 3000;

// Only way to use Middleware :-
app.use(express.json());


// get request
app.get('/',(req,res)=>{
    res.send("Hello this is Get request");
})

app.listen(port, ()=>{
    console.log("App started at port no.",port);
})

