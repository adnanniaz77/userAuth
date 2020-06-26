const express = require("express");
const router = express.Router();

// Register new Routes
router.post("/register", (req, res) => {
    res.send("User Registration");
});

module.exports = router;
