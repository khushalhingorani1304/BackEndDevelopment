const mongoose = require("mongoose");

require("dotenv").config();

function dbConnect() {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch((err) => {
            console.log(err.message);
            process.exit(1);
        });
}

module.exports = { dbConnect };