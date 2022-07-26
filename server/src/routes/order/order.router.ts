import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import { createOrder, getOrder, updateOrder } from "./order.controller";

const orderRouter = Router();

orderRouter.get("/:role", authenticateToken, getOrder);

orderRouter.get("/order-details/:orderID", authenticateToken);

orderRouter.get("/past-order/:role", authenticateToken);

orderRouter.post("/", authenticateToken, createOrder);

orderRouter.put("/:orderId", authenticateToken, updateOrder);

orderRouter.put("/update-driver-location/:orderId", authenticateToken);

export default orderRouter;
