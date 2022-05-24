import { Request, Response } from "express";
import {
    getCustomerPassword,
    getOwnerPassword,
} from "../../models/login.model";
import { findCustomerExist, findOwnerExist } from "../../models/register.model";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    sameSite,
    secure,
} from "../../utils/constant";
import { User } from "../../types";

export const generateAccessToken = (user: User) => {
    return sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: "20m",
    });
};

export const generateRefreshToken = (user: User) => {
    return sign(user, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};

//customer

export const loginCustomer = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, error: "Missing Property" });
    }

    const customer = await findCustomerExist(username);

    if (!customer) {
        return res.status(401).json({
            success: false,
            error: "Invalid username or password",
        });
    }

    const customerPassword = await getCustomerPassword(username);
    const result = await bcrypt.compare(password, customerPassword);

    if (!result) {
        return res.status(401).json({
            success: false,
            error: "Invalid username or password",
        });
    }

    const user: User = {
        userId: customer.id,
        name: customer.first_name,
        role: "customer",
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: sameSite,
        secure: secure,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: sameSite,
        secure: secure,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
        .status(200)
        .json({ success: true, name: customer.first_name, role: "customer" });
};

//owner

export const loginOwner = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, error: "Missing Property" });
    }

    const owner = await findOwnerExist(username);

    if (!owner) {
        return res.status(401).json({
            success: false,
            error: "Invalid username or password",
        });
    }

    const ownerPassword = await getOwnerPassword(username);
    const result = await bcrypt.compare(password, ownerPassword);

    if (!result) {
        return res.status(401).json({
            success: false,
            error: "Invalid username or password",
        });
    }

    const user: User = {
        userId: owner.id,
        name: owner.first_name,
        role: "owner",
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: sameSite,
        secure: secure,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: sameSite,
        secure: secure,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
        .status(200)
        .json({ success: true, name: owner.first_name, role: "owner" });
};

//driver
