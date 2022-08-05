import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { prisma } from "../../services/db";

export const newOrder = async (
    restaurantId: string,
    orderId: string,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    const res = await prisma.restaurant.findUnique({
        where: {
            id: restaurantId,
        },
        select: {
            owner: {
                select: {
                    socket_cookie: true,
                },
            },
            orders: {
                where: {
                    id: orderId,
                },
                select: {
                    id: true,
                    order_date: true,
                    total_items: true,
                    status: true,
                    sub_total: true,
                    payment_method: true,
                    sub_total_eth: true,
                    delivery_address: true,
                    details: true,
                    customer: {
                        select: {
                            first_name: true,
                            last_name: true,
                            phone: true,
                        },
                    },
                    driver: {
                        select: {
                            first_name: true,
                            last_name: true,
                            phone: true,
                        },
                    },
                },
            },
        },
    });

    if (res) {
        io.to(res.owner.socket_cookie).emit("owner-new-order", res.orders[0]);
    }
};
