import { prisma } from "../services/db";

export const getRestaurantMenusFromDB = async (restaurantId: string) => {
    return await prisma.menu_category.findMany({
        where: {
            restaurant_id: restaurantId,
        },
        select: {
            category_name: true,
            id: true,
            priority: true,
            menus: {
                select: {
                    id: true,
                    menu_name: true,
                    price: true,
                    description: true,
                    image: true,
                    status: true,
                },
                orderBy: {
                    menu_name: "asc",
                },
            },
        },
        orderBy: {
            category_name: "asc",
        },
    });
};

export const createRestaurantMenusFromDB = async (
    restaurantId: string,
    categoryId: number,
    price: number,
    name: string,
    description: string,
    imageKey: string
) => {
    return await prisma.menus.create({
        data: {
            restaurant_id: restaurantId,
            category: categoryId,
            price: price,
            menu_name: name,
            description: description,
            image: imageKey,
            status: "available",
        },
    });
};

export const updateMenuByMenuIdFromDB = async (
    menuId: number,
    categoryId: number,
    price: number,
    name: string,
    description: string,
    imageKey: string
) => {
    let data = {};
    if (imageKey) {
        data = {
            category: categoryId,
            price: price,
            menu_name: name,
            description: description,
            image: imageKey,
        };
    } else {
        data = {
            category: categoryId,
            price: price,
            menu_name: name,
            description: description,
        };
    }

    return await prisma.menus.update({
        where: {
            id: menuId,
        },
        data,
    });
};

export const removeMenuByMenuIdFromDB = async (menuId: number) => {
    return await prisma.menus.delete({
        where: {
            id: menuId,
        },
    });
};

export const removeAllMenusByCategoryIdFromDB = async (
    restaurantId: string,
    categoryId: number
) => {
    return await prisma.menus.deleteMany({
        where: {
            restaurant_id: restaurantId,
            category: categoryId,
        },
    });
};
