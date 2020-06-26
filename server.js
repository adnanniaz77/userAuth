const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

app.use("/api", require("./routes/api-routes"));

// connect to Database
const mongoose = require("mongoose");
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
