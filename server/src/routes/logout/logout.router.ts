import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import { logout } from "./logout.controller";

const logoutRouter = Router();

logoutRouter.post("/", authenticateToken, logout);

export default logoutRouter;
