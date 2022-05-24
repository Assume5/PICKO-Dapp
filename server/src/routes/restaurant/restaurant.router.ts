import { Router } from "express";
import { authenticateOwner, authenticateToken } from "../../middleware/auth.middleware";
import { createRestaurant, getOneRestaurant } from "./restaurant.controller";
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

export default restaurantRouter;
