import { Response, Request } from "express";
import fs from "fs";
import { promisify } from "util";
import { checkRestaurantCategoryExists, checkRestaurantCategoryExistsWhenUpdating } from "../../models/check.model";
import { createRestaurantCategoryDB, getRestaurantCategoryFromDB, removeRestaurantCategoryDB, updateMenuCategoryDB, updateRestaurantMenuTypeDB } from "../../models/restaurant-category-setting.model";
import { getImage, uploadImage } from "../../services/s3";

const unlinkFile = promisify(fs.unlink);

const sharp = require("sharp");

export const getMenuCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const data = await getRestaurantCategoryFromDB(id);
        if (data.menu_type === "aio") {
            for (const i in data.menu_category) {
                if (data.menu_category[i].image) {
                    data.menu_category[i].image = await getImage(
                        data.menu_category[i].image
                    );
                }
            }
        }
        res.status(200).json({
            success: true,
            category: data.menu_category,
            menu_type: data.menu_type,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};

export const creatMenuCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { category, priority } = req.body;
    const file = req.file;
    try {
        const categoryExists = await checkRestaurantCategoryExists(
            id,
            category
        );

        if (categoryExists) {
            return res.status(409).json({
                success: false,
                error: "Category Name Already Exists",
            });
        }

        let image: string | null;

        if (file) {
            const buffer = await sharp(file.path)
                .resize({ width: 1920 })
                .toBuffer();
            await sharp(buffer).toFile(file.path);

            const uploadFile = await uploadImage(file);
            await unlinkFile(file.path);

            image = uploadFile.Key;
        }

        await createRestaurantCategoryDB(
            id,
            category,
            priority === "true",
            image
        );
        return res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const updateRestaurantMenuType = async (req: Request, res: Response) => {
    const id = req.params.id;
    const type = req.body.type;
    try {
        await updateRestaurantMenuTypeDB(id, type);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const updateMenuCategory = async (req: Request, res: Response) => {
    const id = req.params.menuId;
    const removePreview = req.body.removePreview === "true";
    const priority = req.body.priority === "true";
    const { category, menuType, restaurantId } = req.body;
    const file = req.file;
    let image: string | null;

    const categoryExists = await checkRestaurantCategoryExistsWhenUpdating(
        restaurantId,
        category,
        +id
    );

    if (categoryExists) {
        return res
            .status(409)
            .json({ success: false, error: "Menu Category Already Exists" });
    }

    if (menuType === "aio" && file) {
        const buffer = await sharp(file.path)
            .resize({ width: 1920 })
            .toBuffer();
        await sharp(buffer).toFile(file.path);

        const uploadFile = await uploadImage(file);
        await unlinkFile(file.path);

        image = uploadFile.Key;
    }

    try {
        await updateMenuCategoryDB(
            +id,
            category,
            priority,
            menuType,
            removePreview,
            image
        );
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const removeMenuCategory = async (req: Request, res: Response) => {
    const id = req.params.menuId;
    try {
        await removeRestaurantCategoryDB(+id);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};
