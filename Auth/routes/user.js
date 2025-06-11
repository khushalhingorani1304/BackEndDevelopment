const express = require("express");
const router = express.Router();

// import handlers
const {login,signup} = require("../controllers/Auth");

const {auth,isStudent,isAdmin} = require("../middlewares/auth");

router.post('/login',login);
router.post('/signup',signup);


// Testing Protected ROutes for Single Middleware
router.get('/test',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        msessage:"Welcome to the Protected routes for Testing"
    })
})


// Protected Routes
router.get('/student',auth,isStudent,(req,res)=>{
    res.status(200).json({
        success:true,
        msessage:"Welcome to the Protected routes for Students"
    })
})

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.status(200).json({
        success:true,
        msessage:"Welcome to the Protected routes for Admin"
    })
})

module.exports = router;