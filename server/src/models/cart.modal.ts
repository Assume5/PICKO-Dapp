import { prisma } from "../services/db";

type guest_cartWhereUniqueInput = {
    id_guestCookieValue_menuId?: guest_cartCompoundUniqueInput | null;
};

type guest_cartCompoundUniqueInput = {
    id: number;
    guest_cookie_value: string;
    menu_id: number;
};

export const checkMenuExistsInCart = async (
    table: string,
    id: string,
    menuId: number
) => {
    let res;
    if (table === "guest_cart") {
        res = await prisma.guest_cart.findMany({
            where: {},
        });
    } else {
        res = await prisma.cart.findMany({
            where: {
                customer_id: id,
                menu_id: menuId,
            },
        });
    }

    return res.length > 0;
};

export const updateMenuInCart = async (
    table: string,
    id: string,
    menuId: number,
    count: number
) => {
    let res;
    if (table === "guest_cart") {
        res = await prisma.guest_cart.updateMany({
            where: {
                guest_cookie_value: id,
                menu_id: menuId,
            },
            data: {
                count: {
                    increment: count,
                },
            },
        });
    } else {
        res = await prisma.cart.updateMany({
            where: {
                customer_id: id,
                menu_id: menuId,
            },
            data: {
                count: {
                    increment: count,
                },
            },
        });
    }

    return res;
};

export const createGuestCartDB = async (
    guestId: string,
    menuId: number,
    price: number,
    menu_name: string,
    count: number,
    restaurantId: string
) => {
    const res = await prisma.guest_cart.create({
        data: {
            guest_cookie_value: guestId,
            restaurant_id: restaurantId,
            menu_id: menuId,
            menu_name,
            price,
            count,
        },
    });

    return res;
};

export const getGuestCartDB = async (guestId: string) => {
    const firstItem = await prisma.guest_cart.findFirst({
        where: {
            guest_cookie_value: guestId,
        },
        select: {
            restaurant_id: true,
        },
    });
    console.log(firstItem);
    const res = await prisma.guest_cart.findMany({
        where: {
            guest_cookie_value: guestId,
        },
        select: {
            menu_id: true,
            menu_name: true,
            price: true,
            count: true,
        },
    });

    return [firstItem, res] as const;
};

export const updateGuestCartDB = async (
    guestId: string,
    menuId: number,
    count: number
) => {
    return await prisma.guest_cart.updateMany({
        where: {
            guest_cookie_value: guestId,
            menu_id: menuId,
        },
        data: {
            count: count,
        },
    });
};
