const express = require('express');
const jwt = require('jsonwebtoken');
const Place = require('../models/Place');

const router = express.Router();

router.get("/", async (req,res) => {
    const token = req.cookies["token"];
    jwt.verify(token, process.env.JWT_TOKEN, {}, async (err, user) => {
        if (err) {
            throw err;
        }
        const placesData = await Place.find({owner: user.id});
        res.json(placesData);
    });
});

exports.places = router;