import { prisma } from "../services/db";

export const getRestaurantSettingsFromDB = async (id: string) => {
    return await prisma.restaurant.findUnique({
        where: {
            id: id,
        },
        select: {
            restaurant_name: true,
            phone: true,
            category: true,
            open_time: true,
            close_time: true,
            full_address: true,
            social_links: true,
            menu_category: true,
        },
    });
};

export const updateRestaurantDB = async (
    id: string,
    phone: string,
    category: string,
    openTime: string,
    closeTime: string,
    facebook: string,
    instagram: string,
    twitter: string
) => {
    return await prisma.restaurant.update({
        where: {
            id: id,
        },
        data: {
            phone: phone,
            category: category,
            open_time: openTime,
            close_time: closeTime,
            social_links: {
                update: {
                    facebook_url: facebook,
                    instagram_url: instagram,
                    twitter_url: twitter,
                },
            },
        },
    });
};
