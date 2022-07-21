import { Request, Response } from "express";
import { getMenuItemFromDB } from "../../models/menu.model";
import { getImage } from "../../services/s3";

export const getMenuItem = async (req: Request, res: Response) => {
    const { menuId } = req.params;
    if (!menuId) {
        return res
            .status(401)
            .json({ success: false, error: "Missing MenuID" });
    }

    try {
        const data = await getMenuItemFromDB(+menuId);

        data.image = await getImage(data.image);

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
