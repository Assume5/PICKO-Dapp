import { prisma } from "../services/db";

export const getDriverStatus = async (userId: string) => {
    return await prisma.driver.findUnique({
        where: { id: userId },
        select: { status: true, lat: true, long: true },
    });
};

export const updateDriverStatusDB = async (userId: string, status: string) => {
    if (status === "0") {
        return await prisma.driver.update({
            where: {
                id: userId,
            },
            data: {
                status,
                lat: "0",
                long: "0",
            },
        });
    }
    return await prisma.driver.update({
        where: {
            id: userId,
        },
        data: {
            status,
        },
    });
};

export const updateDriverLocationDB = async (
    userId: string,
    lat: string,
    long: string
) => {
    return await prisma.driver.update({
        where: {
            id: userId,
        },
        data: {
            lat: lat.toString(),
            long: long.toString(),
        },
    });
};

export const getDriverCurrentOrder = async (driverId: string) => {
    const currentOrder = await prisma.driver.findUnique({
        where: {
            id: driverId,
        },
        select: {
            current_order: true,
        },
    });

    if (currentOrder.current_order) return currentOrder.current_order;
    return null;
};

export const getCustomerSocketCookieBaseOnOrderID = async (orderId: string) => {
    return await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        select: {
            customer: {
                select: {
                    socket_cookie: true,
                },
            },
        },
    });
};
