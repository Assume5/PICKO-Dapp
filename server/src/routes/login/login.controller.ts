import { Request, Response } from "express";
import {
    createGuestDB,
    getCustomerPassword,
    getOwnerPassword,
    getSocket,
    removeGuestDB,
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
import {
    createCartDB,
    deleteAllCartDB,
    findFirstCustomerCartItemDB,
    findFirstGuestCartItemDB,
    getCartDB,
    mergeGuestCartDB,
} from "../../models/cart.modal";
import { getStoreNameFromDB } from "../../models/store.model";

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

export const mergeGuestCartToCustomer = async (
    guestId: string,
    userId: string
) => {
    const cartItems = await getCartDB("guest_cart", guestId);
    if (cartItems[1].length) {
        await deleteAllCartDB("cart", userId);
        for (let i = 0; i < cartItems[1].length; i++) {
            const item = cartItems[1][i];
            const data = await findFirstGuestCartItemDB(guestId, item.menu_id);
            await createCartDB(
                "cart",
                userId,
                data.menu_id,
                data.price,
                data.menu_name,
                data.count,
                data.restaurant_id
            );
        }
    }
};

export const loginCustomer = async (req: Request, res: Response) => {
    const { username, password, guestId } = req.body;
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

    const cookie = await getSocket(username, "customer");
    if (guestId) {
        try {
            await mergeGuestCartToCustomer(guestId, customer.id);
            await removeGuestDB(guestId);
            return res.status(200).json({
                success: true,
                name: customer.first_name,
                role: "customer",
                socketCookie: cookie,
            });
        } catch (err) {
            return res.status(500).json({ success: false, error: err });
        }
    }

    return res.status(200).json({
        success: true,
        name: customer.first_name,
        role: "customer",
        socketCookie: cookie,
    });
};

export const createGuest = async (req: Request, res: Response) => {
    const { guestId } = req.body;

    if (!guestId) {
        return res
            .status(400)
            .json({ success: false, error: "Missing GuestID" });
    }

    try {
        createGuestDB(guestId);
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
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
