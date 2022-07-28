import { prisma } from "../services/db";
import { generateRandomString } from "../utils/function";

//owner
export const findAccountExist = async (username: string, table: string) => {
    const data = {
        where: {
            username: username,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
        },
    };

    if (table === "customer") {
        return await prisma.customer.findUnique(data);
    } else if (table === "owner") {
        return await prisma.owner.findUnique(data);
    } else {
        return await prisma.driver.findUnique(data);
    }
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

export const registerADriver = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    phone: string,
    address: string,
    license: string
) => {
    return await prisma.driver.create({
        data: {
            username: email,
            password,
            first_name: fname,
            last_name: lname,
            phone,
            address,
            driver_license: license,
            lat: "0",
            long: "0",
            status: "0",
        },
    });
};
