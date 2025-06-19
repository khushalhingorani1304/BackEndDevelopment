const express = require("express");
const router = express.Router();

const {uploadImage,uploadVideo,uploadReducedImageSize,uploadImageToLocalServer} = require("../controllers/fileUpload")

// router.post("/image",uploadImage);
// router.post("/video",uploadVideo);
// router.post("/reducedImageSize",uploadReducedImageSize);
router.post("/imageToLocalServer",uploadImageToLocalServer);

module.exports = router;
