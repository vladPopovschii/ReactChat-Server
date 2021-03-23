const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("cors")({ credentials: true }));

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const dashboardRouter = require("./routes/dashboard");
const chatroomRouter = require("./routes/chatroom");

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/chatroom", chatroomRouter);
app.delete("/logout", (req, res) => {
    req.logOut();
    res.json({ msg: "logged out" });
});

module.exports = app;
