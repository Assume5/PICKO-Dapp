import Router from "express";
import {
    authenticateOwner,
    authenticateToken,
} from "../../middleware/auth.middleware";
import { upload } from "../../middleware/upload.middleware";
import {
    createRestaurantMenu,
    getRestaurantMenus,
    removeAllMenusByCategoryId,
    removeMenuByMenuId,
    updateMenuByMenuId,
} from "./restaurant-menu-settings.controller";

const restaurantMenuSettingRouter = Router();

restaurantMenuSettingRouter.get(
    "/menus/:id",
    authenticateToken,
    authenticateOwner,
    getRestaurantMenus
);

restaurantMenuSettingRouter.post(
    "/menus",
    authenticateToken,
    authenticateOwner,
    upload.single("image"),
    createRestaurantMenu
);

restaurantMenuSettingRouter.put(
    "/menus/:menuId",
    authenticateToken,
    authenticateOwner,
    upload.single("image"),
    updateMenuByMenuId
);

restaurantMenuSettingRouter.delete(
    "/menus/:menuId",
    authenticateToken,
    authenticateOwner,
    removeMenuByMenuId
);

restaurantMenuSettingRouter.delete(
    "/menus/remove-all/:categoryId",
    authenticateToken,
    authenticateOwner,
    removeAllMenusByCategoryId
);

export default restaurantMenuSettingRouter;
