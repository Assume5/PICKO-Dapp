const http = require("http");
import { Server, Socket } from "socket.io";
// import { createAdapter } from "@socket.io/cluster-adapter";
// const { setupWorker } = require("@socket.io/sticky");
import app from "./app";
import pool from "./services/db";
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:3000";
const io = new Server(server, {
    cors: {
        origin: allowOrigin,
        credentials: true,
        methods: ["GET", "POST"],
    },
    allowEIO3: true,
});
// io.adapter(createAdapter());
// setupWorker(io);
io.on("connection", (socket: Socket) => {
    console.log("Client connected: ", socket.id);
    pool.query(
        `INSERT INTO socket_session (socket_id) VALUES ('${socket.id}');`
    );

    socket.broadcast.emit("hello", {
        message: `${socket.id} processID: ${process.pid}`,
    });

    socket.on("disconnect", function () {
        console.log("Client disconnected: ", socket.id);
        pool.query(
            `DELETE FROM socket_session WHERE socket_id='${socket.id}';`
        );
    });
});

io.engine.on("connection_error", (err: any) => {
    console.log(err);
});

const startServer = async () => {
    try {
        await pool.connect();
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};
startServer();
