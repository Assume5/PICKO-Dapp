import { Router } from "express";
import {
    authenticateOwner,
    authenticateToken,
} from "../../middleware/auth.middleware";
import {
    createRestaurant,
    creatMenuCategory,
    getMenuCategory,
    getOneRestaurant,
    getRestaurantSettings,
    removeMenuCategory,
    updateMenuCategory,
    updateRestaurantMenuType,
    updateRestaurantSettings,
} from "./restaurant.controller";
import { upload } from "../../middleware/upload.middleware";

const restaurantRouter = Router();

restaurantRouter.post(
    "/",
    authenticateToken,
    upload.fields([
        {
            name: "cardImage",
        },
        {
            name: "heroImages[]",
        },
        {
            name: "categoryImages[]",
        },
    ]),
    createRestaurant
);

restaurantRouter.get(
    "/:id",
    authenticateToken,
    authenticateOwner,
    getOneRestaurant
);

//settings

restaurantRouter.get(
    "/settings/:id",
    authenticateToken,
    authenticateOwner,
    getRestaurantSettings
);

restaurantRouter.put(
    "/settings/:id",
    authenticateToken,
    authenticateOwner,
    updateRestaurantSettings
);

restaurantRouter.get(
    "/menus-categories/:id",
    authenticateToken,
    authenticateOwner,
    getMenuCategory
);

restaurantRouter.post(
    "/menus-category/:id",
    authenticateToken,
    authenticateOwner,
    upload.single("image"),
    creatMenuCategory
);

restaurantRouter.put(
    "/menus-category/menu-type/:id",
    authenticateToken,
    authenticateOwner,
    updateRestaurantMenuType
);

restaurantRouter.put(
    "/menus-category/:menuId",
    authenticateToken,
    authenticateOwner,
    upload.single("image"),
    updateMenuCategory
);

restaurantRouter.delete(
    "/menus-category/:menuId",
    authenticateToken,
    authenticateOwner,
    removeMenuCategory
);

export default restaurantRouter;
