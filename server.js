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

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
const jwt = require("jsonwebtoken");

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = payload.id;
        next();
    } catch (error) {
        console.error(error);
    }
});

io.on("connection", (socket) => {
    console.log(socket.userId + " connected: " + new Date());

    socket.on("disconnected", () => {
        console.log(socket.userId + " disconnected!");
    });
});
