const File = require("../models/File")
const cloudinary = require("cloudinary")
const path = require("path");

// LocalFileUplaod -> handler function
exports.uploadImageToLocalServer = async(req,res) =>{
    try {
        //* File fetch karani hai
        const file = req.files.file;
        console.log("File AA gayi hai jee -> ",file);
        
        //* Jis path pe file store karani hai 
        
        let path = __dirname + "/files/" + Date.now() + "." +file.name.split('.')[1];  //* __dirname means jis current directory mai kaam kar rahe ho usko location humare case mai wo hai "controllers" wala folder
        console.log("Path -> ", path);
        

        
        //* mv matlab Move function. file ko path ki location pe move karna hai  
        file.mv(path, (err) =>{
            console.log(err);
        })
        
        res.json({
            success:true,
            message:"File locally saved!"
        })
        
    } catch (error) {
        console.log(error);        
    }
}


//* Function to check fileType supported or not
function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}


//* File upload Functions
const uploadFileToCludinary = async (file, folder,quality) => {
    const options = {
        folder,
        resource_type: "auto"
    };

    if(quality){
        options.transformation = [{ quality: 10 }];
    }

    console.log("TempfilePath: ",file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};



// uploadImage -> handler function

exports.uploadImage = async(req,res) =>{
    try {
        const {name,tags,email} = req.body;
        console.log(name," ",tags," ",email);
        
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        }

        //agar file type supported hai
        const response = await uploadFileToCludinary(file,"FileUpload");
        console.log("Response",response);


        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })


        return res.status(200).json({
            success:true,
            message:"Image file saved in cloudinary Successfully!!!"
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error while saving the Image in cloudinary"
        })
    }
}


// uploadVideo -> handler Function
exports.uploadVideo = async (req,res) =>{
    try {
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        const fileType = file.name.split('.')[1].toLowerCase();
        const supportedTypes = ["mov","mp4"]; 

        // Validation 1
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"Video Type not Supported"
            })
        }

        // Validation 2 (1 mb -> 1,048,576 bytes)
        console.log("size ->" , file.size/1048576);
        if(file.size/1048576 > 6){
            return res.status(400).json({
                success:false,
                message:"Video Larger than 5MB not allowed"
            })
        }
        
        //agar file type supported hai
        const response = await uploadFileToCludinary(file,"FileUpload","video");


        // create entry in db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        return res.status(200).json({
            success:true,
            message:"Uploaded video successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error while uploading the video in Cloudinary"
        })
    }
}


// uploadReducedImageSize -> handler function

exports.uploadReducedImageSize = async(req,res) =>{
    try {

        const {name,tags,email} = req.body;
        console.log(name," ",tags," ",email);
        
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })
        }

        //agar file type supported hai
        const response = await uploadFileToCludinary(file,"Home",10);
        console.log("Response",response);


        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })


        return res.status(200).json({
            success:true,
            message:"Image file saved in cloudinary Successfully!!!"
        })
        

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while reducing and uploading image to cloudinary"
        })        
    }
}