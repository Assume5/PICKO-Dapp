import { prisma } from "../services/db";
import { heroImagesType, MenuCategoriesType } from "../types";

export const getRestaurant = async (id: string) => {
    return await prisma.restaurant.findUnique({
        where: {
            id: id,
        },
        select: {
            status: true,
            restaurant_name: true,

            orders: true,
        },
    });
};

export const createARestaurant = async (
    name: string,
    fullAddress: string,
    address: string,
    city: string,
    state: string,
    zipcode: string,
    phone: string,
    category: string,
    lat: string,
    long: string,
    openTime: string,
    closeTime: string,
    menuType: string,
    heroType: string,
    cardImageKey: string,
    ownerId: string,
    menuCategories: MenuCategoriesType[],
    heroImageKeys: heroImagesType[],
    facebook: string,
    twitter: string,
    instagram: string
) => {
    return await prisma.restaurant.create({
        data: {
            owner_id: ownerId,
            restaurant_name: name,
            full_address: fullAddress,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone,
            category: category,
            lat: lat,
            long: long,
            menu_type: menuType,
            hero_type: heroType,
            restaurant_card_image: cardImageKey,
            open_time: openTime,
            close_time: closeTime,

            social_links: {
                create: {
                    facebook_url: facebook,
                    twitter_url: twitter,
                    instagram_url: instagram,
                },
            },

            hero_images: {
                createMany: {
                    data: heroImageKeys,
                },
            },

            menu_category: {
                createMany: {
                    data: menuCategories,
                },
            },
        },
    });
};

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

export const getRestaurantCategoryFromDB = async (id: string) => {
    return await prisma.restaurant.findUnique({
        where: {
            id: id,
        },
        select: {
            menu_type: true,
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
