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
