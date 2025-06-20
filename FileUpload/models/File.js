const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

//^ Post Middleware
fileSchema.post("save", async function(doc){
    try {
        // Transporter - ye ek agent ki tarah mail bhejega
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })


        // Send mail and mail ka content
        let info = await transporter.sendMail({
            from:`EasySign`,
            to:doc.email,
            subject:"Important - File uploaded to cloudinary",
            html:`<h2>Haa bhai Dalle</h2> <p>Kab aa raha hai chakkar maarne fir</p>`
        })

        console.log(info);
        

    } catch (error) {
        console.log(error);
    }
})

const File = new mongoose.model("File",fileSchema);
module.exports = File;