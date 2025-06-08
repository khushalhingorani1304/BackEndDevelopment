const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Find user
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists with this Email",
      });
    }


    // Secure Password
    let hashPassword
    try{
        hashPassword = await bcrypt.hash(password,10);
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in hashing the password!"
        })
    }


    // Create User

    const user = await User.create({
        name,email,password:hashPassword,role
    })

    return res.status(200).json({
        success:true,
        message:"User created successfully"
    })


  } catch (err) {
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"User cannot be registered, please try again later"
    })    
  }
};
