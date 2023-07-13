const express = require("express");
const jwtToken = require("jsonwebtoken");
const Booking = require("../models/Booking");

const router = express.Router();

const getUserDataFromReq = (req) => {
    return new Promise((resolve, reject) => {
        jwtToken.verify(
            req.cookies.token,
            process.env.JWT_TOKEN,
            (err, userData) => {
                if (err) throw err;
                resolve(userData);
            }
        );
    });
};

router
    .route("/")
    .get(async (req, res) => {
        const userData = await getUserDataFromReq(req);
        const bookingsData = Booking.find({ user: userData.id });
        return res.json(bookingsData);
    })
    .post(async (req, res) => {
        const userData = await getUserDataFromReq(req);
        const {
            place,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            mobileNumber,
            price,
        } = req.body;

        try {
            const doc = await Booking.create({
                place,
                id: userData.id,
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                mobileNumber,
                price,
            });
            res.status(200).json(doc);
        } catch (err) {
            res.status(500).json("Some Error Occured");
        }
    });

exports.bookings = router;
