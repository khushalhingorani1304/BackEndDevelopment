//* Create A server
const express = require('express');
const app = express();


//* used to parse req.body in express -> PUT or POST
const bodyParser = require('body-parser');


//* Specifically parse JSON data & add it to the req.body object;
app.use(bodyParser.json());


//* Defining port a 3000
app.listen(3000, ()=>{
    console.log("Your server has started at port 3000")
});


//* Create a Route of Http methods 
app.get('/',(req,res)=>{
    res.send("Hello Ji kaise hoo!");
})

app.post('/api/cars', (req,res)=>{
    const {name,brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Cars Submitted Successfully");
})




const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Cars')




.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error: ", err));




// Class2TodoApp