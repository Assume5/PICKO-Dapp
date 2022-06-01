import { Request, Response } from "express";
import { getRestaurantMenusFromDB } from "../../models/restaurant-menu-settings.model";
export const getRestaurantMenus = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const data = await getRestaurantMenusFromDB(id);
        console.log(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};
