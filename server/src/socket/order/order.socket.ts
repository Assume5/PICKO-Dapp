import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { prisma } from "../../services/db";

export const newOrder = async (
    id: string,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    // const res = await prisma.order.findUnique({
    //     where: {
    //         id: id,
    //     },
    //     select: {
    //         restaurant: {
    //             select: {
    //                 owner: {
    //                     select: {
    //                         socket_cookie: true,
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // });
    const res = await prisma.restaurant.findUnique({
        where: {
            id: id,
        },
        select: {
            owner: {
                select: {
                    socket_cookie: true,
                },
            },
        },
    });
    if (res) {
        // io.to(res.restaurant.owner.socket_cookie).emit("owner-new-order");
        io.to(res.owner.socket_cookie).emit("owner-new-order");
    }
};
