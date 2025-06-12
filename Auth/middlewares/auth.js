// ..auth -> authentication
// isStudent, isAdmin -> authorization

const Jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = (req,res,next) =>{

try {

    // Three types of token extraction

    console.log("cookie: ",req.cookies.token);  //* this is possible because of cookie parser used in index.js
    console.log("Body: ", req.body.token);  //* this is possible because of body parser used in index.js
    //console.log("Header - Safest Way of Extracting Token: ", req.header("Authorization").replace("Bearer ",""));  //* "Authorization":"Bearer "<token>;

    const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
    if(!token){
        return res.status(201).json({
            success:false,
            message:"Token is missing"
        })
    }


    //* Verify the Token

    try {
        const decode = Jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decode);

        req.user = decode;
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Ivalid Token!"
        })
    }

    next();

} catch (error) {
    return res.status(500).json({
        success:false,
        message:"Something went wrong, While verifying the Token"
    })
}
}


exports.isStudent = (req,res,next) =>{
    try {

        if(req.user.userRole !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Students Only"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Role is Not Matching"
        })
    }
}


exports.isAdmin = (req,res,next) =>{
    try {

        if(req.user.userRole !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Admin Only"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Role is Not Matching"
        })
    }
}