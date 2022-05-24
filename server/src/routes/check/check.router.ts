import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import { checkLogin, checkRestaurant } from "./check.controller";

const checkRouter = Router();

checkRouter.post("/login", checkLogin);

checkRouter.post("/restaurant", authenticateToken, checkRestaurant);

export default checkRouter;
