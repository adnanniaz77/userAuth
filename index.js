const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// Routes
app.use("/api/user", require("./routes/auth"));
app.use("/api/post", require("./routes/posts"));
app.use('/', require('./routes/html-routes'))

// Connection to Database
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
