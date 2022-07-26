import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { prisma } from "./services/db";

export const listen = (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {};
