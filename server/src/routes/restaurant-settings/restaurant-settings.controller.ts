import {
    getRestaurantSettingsFromDB,
    updateRestaurantDB,
} from "../../models/restaurant-settings.model";
import { Response, Request } from "express";
export const getRestaurantSettings = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await getRestaurantSettingsFromDB(id);
    // data.restaurant_card_image = await getImage(data.restaurant_card_image);
    // for (const i in data.hero_images) {
    //     data.hero_images[i].hero_image = await getImage(
    //         data.hero_images[i].hero_image
    //     );
    // }

    res.status(200).json({ success: true, data: data });
};

export const updateRestaurantSettings = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {
        phone,
        category,
        openTime,
        closeTime,
        facebook,
        instagram,
        twitter,
    } = req.body;
    try {
        await updateRestaurantDB(
            id,
            phone,
            category,
            openTime,
            closeTime,
            facebook,
            instagram,
            twitter
        );
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
