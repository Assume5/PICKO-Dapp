import { prisma } from "../services/db";

export const getOwnerPassword = async (username: string) => {
    const res = await prisma.owner.findUnique({
        where: {
            username,
        },
    });

    return res.password;
};

export const getCustomerPassword = async (username: string) => {
    const res = await prisma.customer.findUnique({
        where: {
            username,
        },
    });

    return res.password;
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
