const bcrypt = require("bcrypt");
const User = require("../models/User");
const Jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Find user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists with this Email",
      });
    }

    // Secure Password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing the password!",
      });
    }

    // Create User

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

// Login Handler

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or Password is missing",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Account does not exists with these credentials. Please SignUp first!",
      });
    }


    //* Password Comparing and Genrating JWT token to send client

    const payload = {
      email:user.email,
      id:user._id,
      userRole:user.role
    }


    if(await bcrypt.compare(password,user.password)){
      //* Token Creation
      let token = Jwt.sign(payload,
                          process.env.JWT_SECRET,
                          {
                            expiresIn:"2h"
                          });
      
      //Note -> humne db mai se password nhi hataya uske instance(object) jo ki user hai jo banaya hai humne usme se hataya hai 
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      //cookie(name, data, options)
      // Humne token jo banaya hai wo cookie ke through bhejenge response banake
      
      const options = {
        expires: new Date(Date.now() + 30000),
        httpOnly:true,
      }
      
      res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"User Logged in Successfully"
      })
      
      // res.status(200).json({
      //   success:true,
      //   token,
      //   user,
      //   message:"User Logged in Successfully"
      // })


    }else{
      return res.status(403).json({
        success:false,
        message:"Password Incorrect."
      })
    }

  } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Login Failure"
      })     
  }
};
