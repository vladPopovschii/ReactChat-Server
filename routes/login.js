const express = require("express");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ auth: req.isAuthenticated() });
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ errorMsg: "No such user!" });

    if (!(await bcrypt.compare(password, user.password)))
        return res.json({ errorMsg: "Incorrect Password!" });

    let payload = {
        id: user.id,
        user,
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 2629743 },
        (err, token) => {
            res.json({
                succes: true,
                token: token,
            });
        }
    );
});
module.exports = router;
