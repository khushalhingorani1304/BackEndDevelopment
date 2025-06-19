const File = require("../models/File")

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