import { Response, Request } from "express";
import { uploadImage } from "../../services/s3";
import { heroImagesType, MenuCategoriesType } from "../../types";
import fs from "fs";
import { promisify } from "util";
import { UserAuthInfo } from "../../types/interface";
import {
    createARestaurant,
    getRestaurant,
} from "../../models/restaurant.model";
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
                    .resize({ width: 500 })
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
        await createARestaurant(
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
        return res.status(201).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false });
    }
};

export const getOneRestaurant = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getRestaurant(id);

    res.status(200).json(result);
};
