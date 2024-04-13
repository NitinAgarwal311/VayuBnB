const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const {users} = require("./routes/UserRoute");
const {newPlace} = require("./routes/NewPlaceRoute");
const {places} = require("./routes/PlacesRoute");
const {bookings} = require("./routes/BookingsRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

app.use('/api/users', users);
app.use('/api/newPlace', newPlace);
app.use('/api/places',places);
app.use('/api/bookings',bookings);
app.use('/api/uploads',express.static(__dirname+'/uploads'));

mongoose.connect(process.env.MONGO_URI);

app.get("/api/test", (req, res) => {
    res.json("Test successful");
});

app.listen(4000);
