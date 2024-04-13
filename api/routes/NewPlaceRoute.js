const express = require("express");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Photo = require("../models/Place");
const jwt = require("jsonwebtoken");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const mime = require("mime-types");
const Place = require("../models/Place");

const router = express.Router();

const parentDirectory = path.resolve(__dirname, "..");

const bucket = "vayubnb-app";

const uploadToS3 = async (path, originalFileName, mimeType) => {
    const client = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });

    const parts = originalFileName.split(".");
    const ext = parts[parts.length - 1];

    const newFileName = Date.now() + "." + ext;

    await client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Body: fs.readFileSync(path),
            Key: newFileName,
            ContentType: mimeType,
            ACL: "public-read",
        })
    );
    
    return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
};

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
        price,
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
            price,
        });

        res.json(placeDoc);
    });
});

router.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const imageFileName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: "/Users/nitinagarwal/tmp/" + imageFileName,
    });

    const url = await uploadToS3( "/Users/nitinagarwal/tmp/" + imageFileName, imageFileName, mime.lookup("/Users/nitinagarwal/tmp/" + imageFileName));
    return res.json(url);
});

const upload = multer({
    dest: "/tmp",
});

router.post("/uploadFile", upload.array("photos", 100), async (req, res) => {
    const uploadedFiles = [];

    for (const file of req.files) {
        const { path, originalname, mimeType } = file;
        const url = await uploadToS3(path, originalname, mimeType);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
});

exports.newPlace = router;
