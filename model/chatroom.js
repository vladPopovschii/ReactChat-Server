const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: {},
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
