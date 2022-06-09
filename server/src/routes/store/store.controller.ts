import { Response, Request } from "express";
import {
    getNearByStoreFromDB,
    getStoreFromDB,
    increaseStoreViewCount,
} from "../../models/store.model";
import { getImage } from "../../services/s3";
import { RestaurantEat } from "../../types";

export const getNearByStore = async (req: Request, res: Response) => {
    const { lat, long } = req.params;
    try {
        const data = (await getNearByStoreFromDB(
            +lat,
            +long
        )) as RestaurantEat[];
        for (const i in data) {
            data[i].restaurant_card_image = await getImage(
                data[i].restaurant_card_image
            );
        }
        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};

export const getStore = async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    try {
        await increaseStoreViewCount(restaurantId);
        const data = await getStoreFromDB(restaurantId);
        for (const i in data.hero_images) {
            data.hero_images[i].hero_image = await getImage(
                data.hero_images[i].hero_image
            );
        }

        if (data.menu_type === "aio") {
            for (const i in data.menu_category) {
                data.menu_category[i].image = await getImage(
                    data.menu_category[i].image
                );
            }
        }

        for (const i in data.menu_category) {
            const menus = data.menu_category[i].menus;
            for (const j in menus) {
                menus[j].image = await getImage(menus[j].image);
            }
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
};
