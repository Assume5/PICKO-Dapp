import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { prisma } from "../services/db";
import { disconnect, join, logout } from "./init-state/init-state.socket";
import { newOrder } from "./order/order.socket";

export const listenSocket = (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    io.on("connection", async (socket: Socket) => {
        const socketCookie = socket.handshake.query["socket-cookie"] as string;
        if (socketCookie) {
            console.log("Client connected: ", socket.id);

            socket.on("JOIN", async (args) => {
                if (!args) return;
                await join(args, socket);
            });

            socket.on("logout", async () => {
                console.log("Client disconnected: ", socket.id);
                await logout(socket);
            });

            socket.on("disconnect", async () => {
                console.log("Client disconnected: ", socket.id);
                await disconnect(socket);
            });

            socket.on("customer-place-order", async (id: string) => {
                await newOrder(id, io);
            });
        }
    });

    io.engine.on("connection_error", (err: any) => {
        console.log(err);
    });
};
