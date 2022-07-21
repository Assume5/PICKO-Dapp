import { UserAuthInfo } from "../../types/interface";
import { Request, Response } from "express";
import {
    createCartDB,
    deleteAllCartDB,
    deleteCartDB,
    getCartDB,
    updateCartDB,
} from "../../models/cart.modal";
import { getStoreNameFromDB } from "../../models/store.model";

const getCart = async (id: string, table: string) => {
    if (!id) {
        return [401, { success: false, error: "Missing GuestID" }];
    }
    try {
        const cart = await getCartDB(table, id);
        if (!cart[0] || !cart[1].length) {
            return [200, { success: true, data: "EMPTY" }];
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

        return [200, { success: true, data: data }];
    } catch (err) {
        return [500, { success: false, error: err }];
    }
};

const createCart = async (
    id: string,
    table: string,
    menuId: number,
    price: number,
    menu_name: string,
    count: number,
    restaurantId: string
) => {
    if (!id || !menuId || !price || !menu_name || !count || !restaurantId) {
        return [401, { success: false, error: "Missing Property" }];
    }

    try {
        const data = await createCartDB(
            table,
            id,
            menuId,
            price,
            menu_name,
            count,
            restaurantId
        );

        return [201, { success: true, data: data }];
    } catch (err) {
        return [500, { success: false, error: err }];
    }
};

const updateCart = async (
    id: string,
    table: string,
    menuId: number,
    count: number
) => {
    if (!id || !menuId || !count) {
        return [401, { success: false, error: "Missing Property" }];
    }

    try {
        await updateCartDB(table, id, menuId, count);
        return [200, { success: true }];
    } catch (err) {
        return [500, { success: false, error: err }];
    }
};

const removeCart = async (id: string, table: string, menuId: number) => {
    if (!menuId || !id) {
        return [401, { success: false, error: "MenuID or GuestID" }];
    }

    try {
        await deleteCartDB(table, id, +menuId);
        return [200, { success: true }];
    } catch (err) {
        return [500, { success: false, error: err }];
    }
};

const removeAllCart = async (id: string, table: string) => {
    if (!id) {
        return [401, { success: false, error: "Missing GuestID" }];
    }

    try {
        await deleteAllCartDB(table, id);
        return [200, { success: true }];
    } catch (err) {
        return [500, { success: false, error: err }];
    }
};

export const getCustomerCart = async (req: UserAuthInfo, res: Response) => {
    const { userId } = req.user;
    const response = await getCart(userId, "cart");
    return res.status(+response[0]).json(response[1]);
};

export const getGuestCart = async (req: Request, res: Response) => {
    const { guestId } = req.params;
    const response = await getCart(guestId, "guest_cart");
    return res.status(+response[0]).json(response[1]);
};

export const createCustomerCart = async (req: UserAuthInfo, res: Response) => {
    const { menuId, price, menu_name, count, restaurantId } = req.body;
    const { userId } = req.user;
    const response = await createCart(
        userId,
        "cart",
        menuId,
        price,
        menu_name,
        count,
        restaurantId
    );

    return res.status(+response[0]).json(response[1]);
};

export const createGuestCart = async (req: Request, res: Response) => {
    const { menuId, price, menu_name, count, restaurantId } = req.body;
    const { guestId } = req.params;
    const response = await createCart(
        guestId,
        "guest_cart",
        menuId,
        price,
        menu_name,
        count,
        restaurantId
    );

    return res.status(+response[0]).json(response[1]);
};

export const updateCustomerCart = async (req: UserAuthInfo, res: Response) => {
    const { menuId, count } = req.body;
    const { userId } = req.user;
    const response = await updateCart(userId, "cart", menuId, count);
    return res.status(+response[0]).json(response[1]);
};

export const updateGuestCart = async (req: Request, res: Response) => {
    const { menuId, count } = req.body;
    const { guestId } = req.params;
    const response = await updateCart(guestId, "guest_cart", menuId, count);
    return res.status(+response[0]).json(response[1]);
};

export const removeCustomerCart = async (req: UserAuthInfo, res: Response) => {
    const { menuId } = req.params;
    const { userId } = req.user;
    const response = await removeCart(userId, "cart", +menuId);
    return res.status(+response[0]).json(response[1]);
};

export const removeGuestCart = async (req: Request, res: Response) => {
    const { menuId, guestId } = req.params;
    const response = await removeCart(guestId, "guest_cart", +menuId);
    return res.status(+response[0]).json(response[1]);
};

export const removeAllGuestCart = async (req: Request, res: Response) => {
    const { guestId } = req.params;
    const response = await removeAllCart(guestId, "guest_cart");
    return res.status(+response[0]).json(response[1]);
};

export const removeAllCustomerCart = async (
    req: UserAuthInfo,
    res: Response
) => {
    const { userId } = req.user;
    const response = await removeAllCart(userId, "cart");
    return res.status(+response[0]).json(response[1]);
};
