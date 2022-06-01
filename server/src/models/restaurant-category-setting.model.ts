import { prisma } from "../services/db";

export const getRestaurantCategoryFromDB = async (id: string) => {
    return await prisma.restaurant.findUnique({
        where: {
            id: id,
        },
        select: {
            menu_type: true,
            menu_category: {
                select: {
                    category_name: true,
                    priority: true,
                    image: true,
                    id: true,
                },
                orderBy: {
                    category_name: "asc",
                },
            },
        },
    });
};

export const createRestaurantCategoryDB = async (
    id: string,
    categoryName: string,
    priority: boolean,
    imageKey: string | undefined
) => {
    return await prisma.menu_category.create({
        data: {
            category_name: categoryName,
            priority: priority,
            image: imageKey,
            restaurant_id: id,
        },
    });
};

export const updateRestaurantMenuTypeDB = async (id: string, type: string) => {
    return await prisma.restaurant.update({
        where: {
            id: id,
        },
        data: {
            menu_type: type,
        },
    });
};

export const updateMenuCategoryDB = async (
    id: number,
    category: string,
    priority: boolean,
    menuType: string,
    removePreview: boolean,
    imageKey: string | null
) => {
    if (!removePreview && !imageKey) {
        return await prisma.menu_category.update({
            where: {
                id: id,
            },
            data: {
                category_name: category,
                priority: priority,
            },
        });
    } else {
        return await prisma.menu_category.update({
            where: {
                id: id,
            },
            data: {
                category_name: category,
                priority: priority,
                image: imageKey ? imageKey : null,
            },
        });
    }
};

export const removeRestaurantCategoryDB = async (menuId: number) => {
    return await prisma.menu_category.delete({
        where: {
            id: menuId,
        },
    });
};
