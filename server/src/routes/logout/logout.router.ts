import { Router } from "express";
import { logout } from "./logout.controller";

const logoutRouter = Router();

logoutRouter.post("/", logout);

export default logoutRouter;
