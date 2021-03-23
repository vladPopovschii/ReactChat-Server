const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { nickname, email, password, confirmPassword } = req.body;

        if (await User.findOne({ email }))
            return res.json({
                errorMsg: "User with that email already exists",
            });

        if (password.length < 8)
            return res.json({
                errorMsg: "Password must be at least 8 characters",
            });

        if (password !== confirmPassword)
            return res.json({ errorMsg: "Passwords must match" });

        const newUser = new User({
            nickname,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await newUser.save();

        res.json({ msg: "registered succesfuly", user: newUser, succes: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "server error" });
    }
});

module.exports = router;
