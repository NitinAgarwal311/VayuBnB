const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.route("/").post(async (req, res) => {
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
