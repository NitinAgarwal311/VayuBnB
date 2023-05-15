const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: "http://localhost:5176"
}));

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

app.get('/test', (req,res) => {
    res.json("Test successful");
});

app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try {
        await User.create({name,email,password});
        res.json({name,email,password});
    }
    catch(e) {
        res.status(422).json(e);
    }
})

app.listen(4000);
