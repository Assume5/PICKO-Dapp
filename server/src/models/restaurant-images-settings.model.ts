import { prisma } from "../services/db";

export const getRestaurantImagesFromDB = async (restaurantId: string) => {
    return await prisma.restaurant.findUnique({
        where: {
            id: restaurantId,
        },
        select: {
            hero_type: true,
            restaurant_card_image: true,
            hero_images: {
                select: {
                    hero_image: true,
                    id: true,
                },
            },
        },
    });
};
