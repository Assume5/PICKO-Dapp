import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { prisma } from "../../services/db";

export const join = async (
    args: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    await socket.join(args);
    await prisma.socket_session.create({
        data: {
            socket_id: socket.id,
            socket_cookie: args,
        },
    });
};

export const removeSocketSession = async (socketId: string) => {
    const found = await prisma.socket_session.findFirst({
        where: {
            socket_id: socketId,
        },
    });

    if (found) {
        await prisma.socket_session.delete({
            where: {
                socket_id: socketId,
            },
        });
    }
};

export const logout = async (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    await removeSocketSession(socket.id);
};

export const disconnect = async (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    await removeSocketSession(socket.id);
};
