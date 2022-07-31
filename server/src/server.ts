const http = require("http");
import cookieParser from "cookie-parser";
import { Server, Socket } from "socket.io";
import app from "./app";
import { prisma } from "./services/db";
import cookie from "cookie";
import { listen } from "./sockets";
import { listenSocket } from "./socket/socket";

// import { createAdapter } from "@socket.io/cluster-adapter";
// const { setupWorker } = require("@socket.io/sticky");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:3000";

const io = new Server(server, {
    cors: {
        origin: allowOrigin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["socket-cookie"],
    },
    allowEIO3: true,
});

app.set("socket", io);

// io.adapter(createAdapter());
// setupWorker(io);

listenSocket(io);

const startServer = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`); 
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
