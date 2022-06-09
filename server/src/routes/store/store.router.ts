import Router from "express";
import { getNearByStore, getStore } from "./store.controller";

const storeRouter = Router();

storeRouter.get("/:lat/:long", getNearByStore);

storeRouter.get("/:restaurantId", getStore);

export default storeRouter;
