import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import { checkLogin } from "./checkLogin.controller";

const checkLoginRouter = Router();

checkLoginRouter.post("/", checkLogin);

export default checkLoginRouter;
