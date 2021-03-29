const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Chatroom = require("../model/chatroom");

router.get("/", auth, async (req, res) => {
    try {
        const { id } = req.body;
        const chatrooms = await Chatroom.find({});

        res.json(chatrooms);
    } catch (error) {
        console.error(error);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { name } = req.body;

        if (await Chatroom.findOne({ name }))
            return res.json({ msg: "Room with that name already exists" });

        const newChatroom = new Chatroom({ name });
        newChatroom.save();

        res.json({ msg: "Chatroom created succesfuly" });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
