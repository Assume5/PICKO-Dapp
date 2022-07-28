import { prisma } from "../services/db";

export const getAccountPassword = async (username: string, table: string) => {
    const data = {
        where: {
            username,
        },
        select: {
            password: true,
        },
    };
    if (table === "customer") {
        const res = await prisma.customer.findUnique(data);
        return res.password;
    } else if (table === "owner") {
        const res = await prisma.owner.findUnique(data);
        return res.password;
    } else {
        const res = await prisma.driver.findUnique(data);
        return res.password;
    }
};

export const getSocket = async (username: string, table: string) => {
    const data = {
        where: {
            username,
        },
        select: {
            socket_cookie: true,
        },
    };

    if (table === "customer") {
        const res = (await prisma.customer.findUnique(data)).socket_cookie;
        console.log(res);
        return res;
    } else if (table === "owner") {
        return (await prisma.owner.findUnique(data)).socket_cookie;
    } else {
        return (await prisma.driver.findUnique(data)).socket_cookie;
    }
};

export const createGuestDB = async (guestID: string) => {
    const res = await prisma.guest.create({
        data: {
            cookie_value: guestID,
        },
    });

    return res;
};

export const removeGuestDB = async (guestID: string) => {
    const res = await prisma.guest.delete({
        where: {
            cookie_value: guestID,
        },
    });

    return res;
};
