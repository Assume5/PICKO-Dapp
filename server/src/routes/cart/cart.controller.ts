import { UserAuthInfo } from "../../types/interface";
import { Request, Response } from "express";
import {
    createGuestCartDB,
    getGuestCartDB,
    updateGuestCartDB,
} from "../../models/cart.modal";
import { getStoreNameFromDB } from "../../models/store.model";

export const getCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const getGuestCart = async (req: Request, res: Response) => {
    const { guestId } = req.params;
    if (!guestId) {
        return res
            .status(401)
            .json({ success: false, error: "Missing GuestID" });
    }
    try {
        const cart = await getGuestCartDB(guestId);
        if (!cart[0] || !cart[1].length) {
            return res.status(200).json({ success: true, data: "EMPTY" });
        }
        const restaurantId = cart[0].restaurant_id;
        const getRestaurantName = await getStoreNameFromDB(restaurantId);
        const restaurantName = getRestaurantName.restaurant_name;
        const cartItems = cart[1];
        const data = {
            restaurantId,
            restaurantName,
            cartItems,
        };

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};

export const createCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const createGuestCart = async (req: Request, res: Response) => {
    const { menuId, price, menu_name, count, restaurantId } = req.body;
    const { guestId } = req.params;

    if (
        !guestId ||
        !menuId ||
        !price ||
        !menu_name ||
        !count ||
        !restaurantId
    ) {
        return res
            .status(401)
            .json({ success: false, error: "Missing Property" });
    }

    try {
        const data = await createGuestCartDB(
            guestId,
            menuId,
            price,
            menu_name,
            count,
            restaurantId
        );

        return res.status(201).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};

export const updateCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const updateGuestCart = async (req: Request, res: Response) => {
    const { menuId, count } = req.body;
    const { guestId } = req.params;

    if (!guestId || !menuId || !count) {
        return res
            .status(401)
            .json({ success: false, error: "Missing Property" });
    }

    try {
        await updateGuestCartDB(guestId, menuId, count);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
};

export const removeCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const removeGuestCart = (req: Request, res: Response) => {};
