const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
    res.json({
        posts: {
            title: "Post Title",
            description: "Post description",
        },
    });
});

module.exports = router;
