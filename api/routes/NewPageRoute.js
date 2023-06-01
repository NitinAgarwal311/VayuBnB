const express = require("express");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const parentDirectory = path.resolve(__dirname, "..");

router.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const imageFileName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: parentDirectory + "/uploads/" + imageFileName,
    });

    return res.json(imageFileName);
});

const upload = multer({
    dest: parentDirectory + "/uploads",
});

router.post("/uploadFile", upload.array("photos", 100), async (req, res) => {
    const uploadedFiles = [];

    req.files.forEach((file) => {
        console.log(file);
        const { path, originalname } = file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        console.log(newPath);
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace(parentDirectory + '/uploads/', ""));
    });

    res.json(uploadedFiles);
});

exports.newPage = router;
