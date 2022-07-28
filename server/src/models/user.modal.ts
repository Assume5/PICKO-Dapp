import { prisma } from "../services/db";

export const getDriverStatus = async (userId: string) => {
    return await prisma.driver.findUnique({
        where: { id: userId },
        select: { status: true },
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
    console.log(userId, lat, long);
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
