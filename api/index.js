const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5176",
    })
);

mongoose.connect(process.env.MONGO_URI);

app.get("/test", (req, res) => {
    res.json("Test successful");
});

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email: email });

        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);

            if (passOk) {
                jwt.sign(
                    { id: userDoc._id, email: userDoc.email },
                    process.env.JWT_TOKEN,
                    {},
                    (err, token) => {
                        if (err) {
                            throw err;
                        }
                        res.cookie("token", token).json("login successful");
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

app.get("/fetch", (req, res) => {
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

app.listen(4000);
