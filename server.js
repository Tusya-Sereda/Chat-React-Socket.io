const express = require("express");
const app = express();
const cors = require("cors");

const httpServer = require("http").Server(app); //create http server
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    },
}); // serve понимает socket

const rooms = new Map(); //collection

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.use(express.json());

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST"],
    })
);

app.get("/rooms/:id", (req, res) => {
    const { id: roomId } = req.params;
    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()]
    } : { users: [], messages: [] };
    res.json(obj);
});

app.post("/rooms", (req, res) => {
    const { roomId, name } = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ["users", new Map()],
                ["messages", []],
            ])
        );
    }

    res.send();
});

io.on("connection", (socket) => {
    socket.on("ROOM:JOIN", ({ roomId, name }) => {
        socket.join(roomId);
        rooms.get(roomId).get("users").set(socket.id, name);
        const users = [...rooms.get(roomId).get("users").values()];
        socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
    });

    socket.on("ROOM:NEW_MESSAGE", ({ roomId, name, text }) => {
        const obj = { name, text };
        rooms.get(roomId).get('messages').push(obj);
        socket.broadcast.to(roomId).emit("ROOM:NEW_MESSAGE", obj);
    })

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get("users").values()];
                socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
            }
        })
    });

    console.log("socket connect", socket);
});

httpServer.listen(5000, (error) => {
    if (error) {
        throw Error(error);
    } else {
        console.log("Server listening on port 5000");
    }
});