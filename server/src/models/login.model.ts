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
