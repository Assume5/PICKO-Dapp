import Router from "express";
import {
    authenticateOwner,
    authenticateToken,
} from "../../middleware/auth.middleware";
import { getRestaurantImages } from "./restaurant-images-settings.controller";

const restaurantImagesSettingRouter = Router();

restaurantImagesSettingRouter.get(
    "/images/:id",
    authenticateToken,
    authenticateOwner,
    getRestaurantImages
);

export default restaurantImagesSettingRouter;
