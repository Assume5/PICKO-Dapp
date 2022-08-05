import Router from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
    createCustomerCart,
    createGuestCart,
    getCustomerCart,
    getGuestCart,
    removeAllCustomerCart,
    removeAllGuestCart,
    removeCustomerCart,
    removeGuestCart,
    updateCustomerCart,
    updateGuestCart,
} from "./cart.controller";

const cartRouter = Router();

cartRouter.get("/guest/:guestId", getGuestCart);
cartRouter.get("/", authenticateToken, getCustomerCart);

cartRouter.post("/guest/:guestId", createGuestCart);
cartRouter.post("/", authenticateToken, createCustomerCart);

cartRouter.put("/guest/:guestId", updateGuestCart);
cartRouter.put("/", authenticateToken, updateCustomerCart);

cartRouter.delete("/guest/:guestId/:menuId", removeGuestCart);
cartRouter.delete("/:menuId", authenticateToken, removeCustomerCart);

cartRouter.delete("/remove-all/guest/:guestId", removeAllGuestCart);
cartRouter.delete("/remove-all", authenticateToken, removeAllCustomerCart);

export default cartRouter;
