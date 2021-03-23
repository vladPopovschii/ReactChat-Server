if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Mongoose Connection ERROR: " + err.message);
});

db.once("open", () => {
    console.log("Connected to DataBase!");
});

const app = require("./app");
const server = require("http").createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
