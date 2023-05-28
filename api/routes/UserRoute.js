const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const router = express.Router();

const bcryptSalt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({ result });
    } catch (e) {
        res.status(422).json(e);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email: email });

        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);

            if (passOk) {
                jwt.sign(
                    {
                        id: userDoc._id,
                        email: userDoc.email,
                        name: userDoc.name,
                    },
                    process.env.JWT_TOKEN,
                    {},
                    (err, token) => {
                        if (err) {
                            throw err;
                        }
                        res.cookie("token", token).json({
                            id: userDoc._id,
                            email: userDoc.email,
                            name: userDoc.name,
                        });
                    }
                );
            } else {
                res.status(422).json("Invalid Credentials");
            }
        } else {
            res.status(422).json("User Not Found");
        }
    } catch (e) {
        res.status(500).json("Some issue has happened");
    }
});

router.get("/fetch", (req, res) => {
    const token = req.cookies["token"];
    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, {}, async (err, user) => {
            if (err) {
                throw err;
            }

            const { _id: id, email, name } = await User.findById(user.id);
            res.json({ id, email, name });
        });
    } else {
        res.json(null);
    }
});

router.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

exports.users = router;