import { prisma } from "../services/db";
import { generateRandomString } from "../utils/function";

//owner
export const findOwnerExist = async (username: string) => {
    return await prisma.owner.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
        },
    });
};

export const registerAOwner = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string
) => {
    return await prisma.owner.create({
        data: {
            username: email,
            password,
            first_name: fname,
            last_name: lname,
            phone,
        },
    });
};

//driver
export const findDriverExist = async (username: string) => {
    return await prisma.driver.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
        },
    });
};

//customer
export const findCustomerExist = async (username: string) => {
    return await prisma.customer.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
        },
    });
};

export const registerACustomer = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string
) => {
    return await prisma.customer.create({
        data: {
            username: email,
            password,
            first_name: fname,
            last_name: lname,
            phone,
        },
    });
};
