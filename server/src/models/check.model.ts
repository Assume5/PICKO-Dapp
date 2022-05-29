import { prisma } from "../services/db";

export const checkRestaurantExists = async (ownerId: string) => {
    return await prisma.restaurant.findFirst({
        where: {
            owner_id: ownerId,
        },
        select: {
            id: true,
        },
    });
};

export const checkRestaurantCategoryExists = async (
    id: string,
    categoryName: string
) => {
    return await prisma.menu_category.findFirst({
        where: {
            restaurant_id: id,
            category_name: categoryName,
        },
    });
};

export const checkRestaurantCategoryExistsWhenUpdating = async (
    id: string,
    categoryName: string,
    menuId: number
) => {
    return await prisma.menu_category.findFirst({
        where: {
            restaurant_id: id,
            category_name: categoryName,
            NOT: {
                id: menuId,
            },
        },
    });
};
