import Router from "express";
import { authenticateOwner, authenticateToken } from "../../middleware/auth.middleware";
import { getRestaurantMenus } from "./restaurant-menu-settings.controller";

const restaurantMenuSettingRouter = Router();

restaurantMenuSettingRouter.get(
    "/menus/:id",
    authenticateToken,
    authenticateOwner,
    getRestaurantMenus
);


export default restaurantMenuSettingRouter;
