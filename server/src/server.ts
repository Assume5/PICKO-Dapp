const http = require("http");
import cookieParser from "cookie-parser";
import { Server, Socket } from "socket.io";
import app from "./app";
import { createDatabaseTable } from "./services/createTable";
import pool, { prisma } from "./services/db";
import cookie from "cookie";

// import { createAdapter } from "@socket.io/cluster-adapter";
// const { setupWorker } = require("@socket.io/sticky");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:3000";

console.log(allowOrigin);

const io = new Server(server, {
    cors: {
        origin: allowOrigin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["socket-cookie"],
    },
    allowEIO3: true,
});

// io.adapter(createAdapter());
// setupWorker(io);

io.on("connection", async (socket: Socket) => {
    // console.log(cookie.parse(socket.handshake.headers.cookie)["socket-cookie"]);
    const socketCookie: string = socket.handshake.query[
        "socket-cookie"
    ] as string;
    // console.log(headerCookie);
    console.log("Client connected: ", socket.id);
    socket.leave(socket.id);
    socket.join(socketCookie);
    // console.log(socket.rooms)
    // console.log(socketCookie);
    // console.log(socket.handshake.query);
    console.log(socket.handshake);
    // await prisma.socket_session.create({
    //     data: {
    //         socket_id: socket.id,
    //         socket_cookie: socketCookie,
    //     },
    // });

    socket.on("JOIN", async (cookie) => {
        console.log(socket.id);
        console.log(cookie);
        // await prisma.socket_session.create({
        //     data: {
        //         socket_id: socket.id,
        //         socket_cookie: socketCookie,
        //     },
        // });
    });

    socket.broadcast.emit("hello", {
        message: `${socket.id} processID: ${process.pid}`,
    });

    socket.on("disconnect", async () => {
        console.log("Client disconnected: ", socket.id);
        // await prisma.socket_session.delete({
        //     where: {
        //         socket_id: socket.id,
        //     },
        // });
    });
});

io.engine.on("connection_error", (err: any) => {
    console.log(err);
});

const startServer = async () => {
    try {
        await pool.connect();
        createDatabaseTable();
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
