const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Chatroom = require("../model/chatroom");

router.post("/", auth, async (req, res) => {
    const { name } = req.body;

    if (await Chatroom.findOne({ name }))
        throw "Chatroom with that name already exists";

    const newChatroom = new Chatroom({ name });
    newChatroom.save();

    res.json({ msg: "Chatroom created succesfuly" });
});

module.exports = router;
