const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();

router.post("/", verify, (req, res) => {
    // posts
});

module.exports = router;
