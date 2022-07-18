import Router from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
    createCustomerCart,
    createGuestCart,
    getGuestCart,
    removeGuestCart,
    updateCustomerCart,
    updateGuestCart,
} from "./cart.controller";

const cartRouter = Router();

cartRouter.get("/guest/:guestId", getGuestCart);
cartRouter.get("/", authenticateToken);

cartRouter.post("/guest/:guestId", createGuestCart);
cartRouter.post("/", authenticateToken, createCustomerCart);

cartRouter.put("/guest/:guestId", updateGuestCart);
cartRouter.put("/", authenticateToken);

cartRouter.delete("/guest/:guestId", removeGuestCart);
cartRouter.delete("/", authenticateToken);

export default cartRouter;
