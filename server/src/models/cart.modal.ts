import { prisma } from "../services/db";

export const findFirstGuestCartItemDB = async (id: string, menuId: number) => {
    return await prisma.guest_cart.findFirst({
        where: {
            customer_id: id,
            menu_id: menuId,
        },
    });
};

export const findFirstCustomerCartItemDB = async (
    id: string,
    menuId: number
) => {
    return await prisma.cart.findFirst({
        where: {
            customer_id: id,
            menu_id: menuId,
        },
    });
};

export const mergeGuestCartDB = async (
    id: string,
    menuId: number,
    count: number
) => {
    return await prisma.cart.updateMany({
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
};

export const createCartDB = async (
    table: string,
    id: string,
    menuId: number,
    price: number,
    menu_name: string,
    count: number,
    restaurantId: string
) => {
    const data = {
        data: {
            customer_id: id,
            restaurant_id: restaurantId,
            menu_id: menuId,
            menu_name,
            price,
            count,
        },
    };
    if (table === "guest_cart") {
        return await prisma.guest_cart.create(data);
    }

    if (table === "cart") {
        return await prisma.cart.create(data);
    }
};

export const updateCartDB = async (
    table: string,
    id: string,
    menuId: number,
    count: number
) => {
    const data = {
        where: {
            customer_id: id,
            menu_id: menuId,
        },
        data: {
            count: count,
        },
    };

    if (table === "guest_cart") {
        return await prisma.guest_cart.updateMany(data);
    }

    if (table === "cart") {
        return await prisma.cart.updateMany(data);
    }
};

export const getCartDB = async (table: string, id: string) => {
    const firstItemData = {
        where: {
            customer_id: id,
        },
        select: {
            restaurant_id: true,
        },
    };

    const findData = {
        where: {
            customer_id: id,
        },
        select: {
            menu_id: true,
            menu_name: true,
            price: true,
            count: true,
        },
    };

    if (table === "guest_cart") {
        const firstItem = await prisma.guest_cart.findFirst(firstItemData);
        const res = await prisma.guest_cart.findMany(findData);
        return [firstItem, res] as const;
    }

    if (table === "cart") {
        const firstItem = await prisma.cart.findFirst(firstItemData);
        const res = await prisma.cart.findMany(findData);
        return [firstItem, res] as const;
    }
};

export const deleteCartDB = async (
    table: string,
    id: string,
    menuId: number
) => {
    const removeData = {
        where: {
            customer_id: id,
            menu_id: menuId,
        },
    };
    if (table === "guest_cart") {
        return await prisma.guest_cart.deleteMany(removeData);
    }

    if (table === "cart") {
        return await prisma.cart.deleteMany(removeData);
    }
};

export const deleteAllCartDB = async (table: string, id: string) => {
    const removeData = {
        where: {
            customer_id: id,
        },
    };

    if (table === "guest_cart") {
        return await prisma.guest_cart.deleteMany(removeData);
    }

    if (table === "cart") {
        return await prisma.cart.deleteMany(removeData);
    }
};

// prisma.order.findUnique({
//     where: {
//         id: "1",
//     },
//     select: {
//         restaurant: {
//             select: {
//                 restaurant_name: true,
//                 id: true,
//             },
//         },
//         status: true,
//         order_date: true,
//         deliver_fee: true,
//         sub_total: true,
//         driver_tip: true,
//         details: {
//             select: {
//                 count: true,
//                 menus: {
//                     select: {
//                         menu_name: true,
//                         price: true,
//                     },
//                 },
//             },
//         },
//     },
// });

// prisma.customer.findUnique({
//     where: {
//         id: "1",
//     },
//     select: {
//         orders: {
//             select: {
//                 restaurant: {
//                     select: {
//                         restaurant_name: true,
//                         restaurant_card_image: true,
//                         id: true,
//                     },
//                 },
//                 order_date: true,
//                 sub_total: true,
//                 details: {
//                     select: {
//                         count: true,
//                         menus: {
//                             select: {
//                                 menu_name: true,
//                                 price: true,
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     },
// });
