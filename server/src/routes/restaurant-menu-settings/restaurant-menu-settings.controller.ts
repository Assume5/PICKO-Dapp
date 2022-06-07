import { Request, Response } from "express";
import {
    createRestaurantMenusFromDB,
    getRestaurantMenusFromDB,
    removeAllMenusByCategoryIdFromDB,
    removeMenuByMenuIdFromDB,
    updateMenuByMenuIdFromDB,
} from "../../models/restaurant-menu-settings.model";
import { upload } from "../../middleware/upload.middleware";
import fs from "fs";
import { promisify } from "util";
import { getImage, uploadImage } from "../../services/s3";
const sharp = require("sharp");
const unlinkFile = promisify(fs.unlink);

export const getRestaurantMenus = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const data = await getRestaurantMenusFromDB(id);
        for (const i in data) {
            const menus = data[i].menus;
            for (const j in menus) {
                const imgLink = await getImage(menus[j].image);
                menus[j].image = imgLink;
            }
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const createRestaurantMenu = async (req: Request, res: Response) => {
    const file = req.file;
    const buffer = await sharp(file.path).resize({ width: 500 }).toBuffer();
    await sharp(buffer).toFile(file.path);

    const uploadFile = await uploadImage(file);
    await unlinkFile(file.path);

    const image = uploadFile.Key;

    const { id, name, price, description, category_id } = req.body;

    try {
        await createRestaurantMenusFromDB(
            id,
            +category_id,
            +price,
            name,
            description,
            image
        );
        return res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const updateMenuByMenuId = async (req: Request, res: Response) => {
    let image;
    const file = req.file;
    if (file) {
        const buffer = await sharp(file.path).resize({ width: 500 }).toBuffer();
        await sharp(buffer).toFile(file.path);

        const uploadFile = await uploadImage(file);
        await unlinkFile(file.path);

        image = uploadFile.Key;
    }
    
    const { name, price, description, category_id } = req.body;
    const { menuId } = req.params;

    try {
        await updateMenuByMenuIdFromDB(
            +menuId,
            +category_id,
            +price,
            name,
            description,
            image
        );
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
};

export const removeMenuByMenuId = async (req: Request, res: Response) => {
    const { menuId } = req.params;
    try {
        await removeMenuByMenuIdFromDB(+menuId);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
};

export const removeAllMenusByCategoryId = async (
    req: Request,
    res: Response
) => {
    const { categoryId } = req.params;
    const { restaurantId } = req.body;

    try {
        await removeAllMenusByCategoryIdFromDB(restaurantId, +categoryId);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};
