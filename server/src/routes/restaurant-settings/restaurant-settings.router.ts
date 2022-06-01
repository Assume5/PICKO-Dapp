import Router from "express";
import {
    authenticateOwner,
    authenticateToken,
} from "../../middleware/auth.middleware";
import {
    getRestaurantSettings,
    updateRestaurantSettings,
} from "./restaurant-settings.controller";

const restaurantSettingRouter = Router();

restaurantSettingRouter.get(
    "/settings/:id",
    authenticateToken,
    authenticateOwner,
    getRestaurantSettings
);

restaurantSettingRouter.put(
    "/settings/:id",
    authenticateToken,
    authenticateOwner,
    updateRestaurantSettings
);

export default restaurantSettingRouter;
