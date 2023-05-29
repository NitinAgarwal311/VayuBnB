const express = require('express');
const imageDownloader = require('image-downloader');
const path = require('path');

const router = express.Router();

router.post("/upload-by-link", async (req, res) => {
    const {link} = req.body;
    const parentDirectory = path.resolve(__dirname,'..');
    console.log(parentDirectory);
    const imageFileName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: parentDirectory + '/uploads/'+ imageFileName
    });

    return res.json(imageFileName);

})

exports.newPage = router;