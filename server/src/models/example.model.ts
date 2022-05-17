import pool from "../services/db";
import { prisma } from "../services/db";
export const findRow = async (id: number) => {
    return await prisma.test.findUnique({
        where: {
            id: id,
        },
    });
};

export const getExampleDB = async () => {
    try {
        const response = await prisma.test.findMany();
        return response;
    } catch (err) {
        return err;
    }
};

export const postExampleDB = async (fname: string, lname: string) => {
    await prisma.test
        .create({
            data: {
                fname: fname,
                lname: lname,
            },
        })
        .catch((err) => {
            console.log(`Insert to example fail: ${err}`);
        });
};

export const updateExampleDB = async (
    ID: number,
    fname: string,
    lname: string
) => {
    await prisma.test
        .update({
            where: {
                id: ID,
            },
            data: {
                fname: fname,
                lname: lname,
            },
        })
        .catch((err) => {
            console.log(`Update to example fail: ${err}`);
        });
};

export const deleteExampleDB = async (ID: number) => {
    await prisma.test
        .delete({
            where: {
                id: ID,
            },
        })
        .catch((err) => {
            console.log(`Delete to example fail: ${err}`);
        });
};
