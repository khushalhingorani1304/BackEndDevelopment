// Import mongoose
const mongoose = require("mongoose");

// route Handler
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    //* this will store Arrays of Like and comment with id of user who has liked and commented
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})



// export
module.exports = mongoose.model("Post",postSchema);