const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

// Middleware
app.use("/api/user", require("./routes/auth"));

// connect to Database
const mongoose = require("mongoose");
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Listening and serving on PORT
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
