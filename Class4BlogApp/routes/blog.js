const express = require("express");
const router = express.Router();

// Import Controllers
const {dummyLink, likePost, unlikePost} = require("../controllers/LikeControllers");
const {createComment} = require("../controllers/CommentControllers");
const {createPost, getAllPosts} = require("../controllers/postController");

// Define Api Routes (This Syntax is possible because of Importing express
router.get("/dummyLink",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.delete("/likes/unlike",unlikePost);



// Export
module.exports = router;