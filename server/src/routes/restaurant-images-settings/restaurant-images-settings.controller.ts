import { Response, Request } from "express";
import { getRestaurantImagesFromDB } from "../../models/restaurant-images-settings.model";
import { getImage } from "../../services/s3";

export const getRestaurantImages = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const data = await getRestaurantImagesFromDB(id);
        data.restaurant_card_image = await getImage(data.restaurant_card_image);
        for (const i in data.hero_images) {
            data.hero_images[i].hero_image = await getImage(
                data.hero_images[i].hero_image
            );
        }
        return res.status(200).json({ success: true, data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};
