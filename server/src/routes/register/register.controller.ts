import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
    findCustomerExist,
    findOwnerExist,
    registerACustomer,
    registerAOwner,
} from "../../models/register.model";
import { generateRandomString } from "../../utils/function";

const saltRounds = 15;
const salt = bcrypt.genSaltSync(saltRounds);

export const registerCustomer = async (req: Request, res: Response) => {
    const { email, password, fname, lname, phone } = req.body;

    if (!email || !password || !fname || !lname || !phone) {
        return res.status(400).json({ success: false, error: "Missing body" });
    }

    if (await findCustomerExist(email)) {
        return res
            .status(409)
            .json({ success: false, error: "Email has been registered" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    await registerACustomer(email, hashedPassword, fname, lname, phone);

    return res.status(200).json({ success: true });
};

export const registerOwner = async (req: Request, res: Response) => {
    const { email, password, fname, lname, phone } = req.body;

    if (!email || !password || !fname || !lname || !phone) {
        return res.status(400).json({ success: false, error: "Missing body" });
    }

    if (await findOwnerExist(email)) {
        return res
            .status(409)
            .json({ success: false, error: "Email has been registered" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    await registerAOwner(email, hashedPassword, fname, lname, phone);

    return res.status(200).json({ success: true });
};

export const registerDriver = async (req: Request, res: Response) => {};
