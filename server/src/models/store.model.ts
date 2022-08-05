import { prisma } from "../services/db";

export const getNearByStoreFromDB = async (lat: number, long: number) => {
    return await prisma.$queryRaw`SELECT id, 
        restaurant_name, 
        full_address, category, 
        open_time, 
        close_time, 
        restaurant_card_image, 
        view_count, 
        status, 
        lat, 
        long, SQRT(
        POW(69.1 * (cast(lat as double precision) - ${lat}), 2) +
        POW(69.1 * (${long} - cast(long as double precision)) * COS(cast(lat as double precision) / 57.3), 2)) AS distance
        FROM restaurant WHERE SQRT(
        POW(69.1 * (cast(lat as double precision) - ${lat}), 2) +
        POW(69.1 * (${long} - cast(long as double precision)) * COS(cast(lat as double precision) / 57.3), 2)) < 10 ORDER BY distance;`;
};

export const increaseStoreViewCount = async (restaurantId: string) => {
    return await prisma.restaurant.update({
        where: {
            id: restaurantId,
        },
        data: {
            view_count: {
                increment: 1,
            },
        },
    });
};

export const getStoreFromDB = async (restaurantId: string) => {
    return await prisma.restaurant.findUnique({
        where: {
            id: restaurantId,
        },
        select: {
            id: true,
            restaurant_name: true,
            address: true,
            city: true,
            state: true,
            zipcode: true,
            category: true,
            lat: true,
            long: true,
            open_time: true,
            close_time: true,
            menu_type: true,
            hero_type: true,
            status: true,
            menu_category: {
                select: {
                    category_name: true,
                    image: true,
                    priority: true,
                    menus: {
                        select: {
                            description: true,
                            image: true,
                            id: true,
                            menu_name: true,
                            status: true,
                            price: true,
                        },
                        orderBy: {
                            menu_name: "asc",
                        },
                    },
                },
                orderBy: {
                    category_name: "asc",
                },
            },
            hero_images: {
                select: {
                    hero_image: true,
                },
            },
            social_links: {
                select: {
                    facebook_url: true,
                    twitter_url: true,
                    instagram_url: true,
                },
            },
        },
    });
};

export const getStoreNameFromDB = async (storeId: string) => {
    return await prisma.restaurant.findFirst({
        where: {
            id: storeId,
        },
        select: {
            restaurant_name: true,
        },
    });
};
