const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

// exported function for input validation
const { registerValidation, loginValidation } = require("../validation");
const { required } = require("@hapi/joi");

/////////////// REGISTER NEW USER ////////////
router.post("/register", async (req, res) => {
    // Applying validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email already exists");

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user.id });
    } catch (err) {
        res.status(400).send(err);
    }
});

/////////////// USER LOGIN ////////////
router.post("/login", async (req, res) => {
    // Applying login validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email exists in the database or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email does not exist");

    // Get the password and compare it
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    // Display message as logged in successfully
    res.send("Logged in");
});

module.exports = router;
