exports.dummyLink = (req,res) =>{
    res.send("This is a Dummy Router Baby!!!");
}


const Post = require("../models/postModel");
const Like = require("../models/likeModel")

// like a Post
exports.likePost = async(req,res)=>{
    try {
        const {post,user} = req.body

        const like = new Like({
            post,user
        })

        const savedlike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post,{$push : {likes:savedlike._id}},{new:true}).populate("likes").exec();

        res.json({
            post:updatedPost
        })

    } catch (error) {
        return res.status(400).json({
            error:"Error occured while Liking a Post"
        })
    }
}


exports.unlikePost = async(req,res) =>{
    try {
        const {post,like} = req.body

        // Find and delete from Like collection (from both post id and like id) / can also do find by Id and delete by using only Like id cauz every like will get different Id
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        // update the Post Collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull : {likes: deletedLike._id}},{new:true}).populate("likes").exec();

        res.json({
            post:updatedPost
        })

    } catch (error) {
        return res.status(400).json({
            error:"Error occured while Unliking a Post"
        })      
    }
}