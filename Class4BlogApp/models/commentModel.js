const mongoose = require("mongoose");

// route Handler
const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,  //This is how you mention that you will store id in this
        ref: "Post", //reffernce to the post model
    },
    user:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }
});



// export
module.exports = mongoose.model("Comment",commentSchema);