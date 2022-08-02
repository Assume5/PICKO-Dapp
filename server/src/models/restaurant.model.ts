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
            lat: true,
            long: true,
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
