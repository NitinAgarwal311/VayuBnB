const express = require("express");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Photo = require("../models/Place");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const Place = require("../models/Place");

const router = express.Router();

const parentDirectory = path.resolve(__dirname, "..");

router.post("/", async (req, res) => {
    const token = req.cookies["token"];
    const {
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    } = req.body;
    jwt.verify(token, process.env.JWT_TOKEN, {}, async (err, user) => {
        const placeDoc = await Place.create({
            owner: user.id,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });

        res.json(placeDoc);
    });
});

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
        const { path, originalname } = file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace(parentDirectory + "/uploads/", ""));
    });

    res.json(uploadedFiles);
});

exports.newPlace = router;
