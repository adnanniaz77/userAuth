const router = require("express").Router();
const User = require("../model/User");

// Validate user input
const Joi = require("@hapi/joi");
const { schema } = require("../model/User");

// function for register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// function for login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required,
    });

    return schema.validate(data);
};

// Register new user
router.post("/register", async (req, res) => {
    // Applying validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email already exists");

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
