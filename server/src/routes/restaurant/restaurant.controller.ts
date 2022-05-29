import { Response, Request } from "express";
import { getImage, uploadImage } from "../../services/s3";
import { heroImagesType, MenuCategoriesType } from "../../types";
import fs from "fs";
import { promisify } from "util";
import { UserAuthInfo } from "../../types/interface";
import {
    createARestaurant,
    createRestaurantCategoryDB,
    getRestaurant,
    getRestaurantCategoryFromDB,
    getRestaurantSettingsFromDB,
    removeRestaurantCategoryDB,
    updateMenuCategoryDB,
    updateRestaurantDB,
    updateRestaurantMenuTypeDB,
} from "../../models/restaurant.model";
import {
    checkRestaurantCategoryExists,
    checkRestaurantCategoryExistsWhenUpdating,
} from "../../models/check.model";

const sharp = require("sharp");

const unlinkFile = promisify(fs.unlink);

interface RequestFiles extends UserAuthInfo {
    files: {
        cardImage: Express.Multer.File[];
        "heroImages[]": Express.Multer.File[];
        "categoryImages[]": Express.Multer.File[];
    };
}

export const createRestaurant = async (req: RequestFiles, res: Response) => {
    const cardImage = req.files["cardImage"];
    const categoryImages = req.files["categoryImages[]"];
    const heroImages = req.files["heroImages[]"];

    const categoryPathWithName: MenuCategoriesType[] = [];
    const heroImageKeys: heroImagesType[] = [];
    let cardImageKey = "";
    let menuCategories: MenuCategoriesType[] = [];

    const {
        address,
        category,
        city,
        closeTime,
        fullAddress,
        lat,
        long,
        name,
        openTime,
        phone,
        state,
        zipcode,
        facebook,
        menuCategory,
        menuType,
        heroType,
        instagram,
        twitter,
    } = req.body;

    const listOfRestaurantCategory: string[] = category
        .split(".")
        .map((item: string) => item.trim());

    if (menuType === "aio") {
        for (let i = 0; i < JSON.parse(menuCategory).length; i++) {
            try {
                const buffer = await sharp(categoryImages[i].path)
                    .resize({ width: 1920 })
                    .toBuffer();
                await sharp(buffer).toFile(categoryImages[i].path);

                const res = await uploadImage(categoryImages[i]);
                await unlinkFile(categoryImages[i].path);

                categoryPathWithName.push({
                    priority: JSON.parse(menuCategory)[i].priority as boolean,
                    category_name: JSON.parse(menuCategory)[i].category_name,
                    image: res.Key,
                });
            } catch (err) {
                return res.status(500).json({ success: false, error: err });
            }
            menuCategories = categoryPathWithName;
        }
    } else if (menuType === "filter") {
        menuCategories = JSON.parse(menuCategory);
    }

    try {
        const buffer = await sharp(cardImage[0].path)
            .resize({ width: 1920 })
            .toBuffer();
        await sharp(buffer).toFile(cardImage[0].path);
        const cardImgRes = await uploadImage(cardImage[0]);
        await unlinkFile(cardImage[0].path);
        cardImageKey = cardImgRes.Key;
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }

    for (const file of heroImages) {
        try {
            const buffer = await sharp(file.path)
                .resize({ width: 1920 })
                .toBuffer();
            await sharp(buffer).toFile(file.path);
            const res = await uploadImage(file);
            await unlinkFile(file.path);
            await heroImageKeys.push({ hero_image: res.Key });
        } catch (err) {
            return res.status(500).json({ success: false, error: err });
        }
    }

    try {
        const result = await createARestaurant(
            name,
            fullAddress,
            address,
            city,
            state,
            zipcode,
            phone,
            listOfRestaurantCategory.join(", "),
            lat,
            long,
            openTime,
            closeTime,
            menuType,
            heroType,
            cardImageKey,
            req.user.userId,
            menuCategories,
            heroImageKeys,
            facebook,
            twitter,
            instagram
        );
        return res.status(201).json({ success: true, id: result.id });
    } catch (err) {
        return res.status(500).json({ success: false });
    }
};

export const getOneRestaurant = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getRestaurant(id);

    res.status(200).json(result);
};

//settings

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
