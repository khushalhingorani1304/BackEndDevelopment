const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDb = () => {
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB Connected Successfully"))
    .catch((error) =>{
        console.log("DB Connection Error");
        console.error(error);
        process.exit(1);
    })
}