import { Router } from "express";
import { getMenuItem } from "./menu.controller";

const menuRouter = Router();

menuRouter.get("/:menuId", getMenuItem);

export default menuRouter;
