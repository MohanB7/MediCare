const mongoose = require("mongoose");
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(
        (error) => {
            console.log("Not Connected to MongoDB", error);
        }
    );

// Routes
app.use("/api/users", require("./Routers/userrouter"));
app.use("/api/appointments", require("./Routers/appointmentrouter"));
