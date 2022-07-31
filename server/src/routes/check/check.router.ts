import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import { checkDriverStatus, checkLogin, checkRestaurant } from "./check.controller";

const checkRouter = Router();

checkRouter.post("/login", checkLogin);

checkRouter.post("/restaurant", authenticateToken, checkRestaurant);

checkRouter.get('/driver/status', authenticateToken, checkDriverStatus)

export default checkRouter;
