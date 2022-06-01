import Router from "express";
import { authenticateOwner, authenticateToken } from "../../middleware/auth.middleware";
import { upload } from "../../middleware/upload.middleware";
import { creatMenuCategory, getMenuCategory, removeMenuCategory, updateMenuCategory, updateRestaurantMenuType } from "./restaurant-category-setting.controller";

const restaurantMenuCategorySettingsRouter = Router();

restaurantMenuCategorySettingsRouter.get(
    "/menus-categories/:id",
    authenticateToken,
    authenticateOwner,
    getMenuCategory
);

restaurantMenuCategorySettingsRouter.post(
    "/menus-category/:id",
    authenticateToken,
    authenticateOwner,
    upload.single("image"),
    creatMenuCategory
);

restaurantMenuCategorySettingsRouter.put(
    "/menus-category/menu-type/:id",
    authenticateToken,
    authenticateOwner,
    updateRestaurantMenuType
);

restaurantMenuCategorySettingsRouter.put(
    "/menus-category/:menuId",
    authenticateToken,
    authenticateOwner,
    upload.single("image"),
    updateMenuCategory
);

restaurantMenuCategorySettingsRouter.delete(
    "/menus-category/:menuId",
    authenticateToken,
    authenticateOwner,
    removeMenuCategory
);

export default restaurantMenuCategorySettingsRouter;
