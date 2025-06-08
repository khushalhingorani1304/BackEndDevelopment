// Import Model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");


// business logic

exports.createComment = async (req,res) =>{
    try{
        // fetch data
        const {post, user, body} = req.body;

        // create a comment obj
        const comment = new Comment({
            post,user,body
        });


        // Save the obj in db
        const savedComment = await comment.save();
        
        // *find the Post using id , and add the new comment in its array
        // *there are 2 methods 1)$push which is used to update and 2)$pull which is used to delete
        // *{new:true} means that this should return the updated post not the old one!!! 
        // *if we dont write .populate() it will store comments._id in "Comments" Arr in Posts model but after adding it it will store the full document related to the id
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments:savedComment._id}},{new:true}).populate("comments").exec();

        
        res.json({
            post:updatedPost,
        });

    }
    catch(err){
        return res.status(500).json({
            error:"Error while Creating comment",
        })
    }
}