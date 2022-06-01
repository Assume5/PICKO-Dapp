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
