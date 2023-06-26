const express = require("express");
const jwt = require("jsonwebtoken");
const Place = require("../models/Place");

const router = express.Router();

router.get("/", async (req, res) => {
    const token = req.cookies["token"];
    jwt.verify(token, process.env.JWT_TOKEN, {}, async (err, user) => {
        if (err) {
            throw err;
        }
        const placesData = await Place.find({ owner: user.id });
        res.json(placesData);
    });
});

router.get("/all", async(req,res) => {
    const placesData = await Place.find({});
    res.json(placesData);
});

router
    .route("/:id")
    .get(async (req, res) => {
        const placeData = await Place.findById(req.params.id);
        res.json(placeData);
    })
    .put(async (req, res) => {
        const token = req.cookies["token"];
        jwt.verify(token, process.env.JWT_TOKEN, {}, async (err, user) => {
            if (err) {
                throw err;
            }

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
            } = req.body;

            const placeDoc = await Place.findById(req.params.id);

            if (placeDoc.owner.toString() === user.id) {
                placeDoc.set({
                    title,
                    address,
                    photos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                });

                placeDoc.save();
            }
        });
    });

exports.places = router;
