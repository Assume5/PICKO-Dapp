import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
    createOrder,
    driverCurrentOrder,
    getNearByDriverOrder,
    getOrder,
    getOrderDetails,
    updateOrder,
} from "./order.controller";

const orderRouter = Router();

orderRouter.get("/:role", authenticateToken, getOrder);

orderRouter.get(
    "/driver/nearby-order",
    authenticateToken,
    getNearByDriverOrder
);

orderRouter.get("/order-details/:orderID", authenticateToken, getOrderDetails);

orderRouter.get("/driver/current-order", authenticateToken, driverCurrentOrder);

orderRouter.get("/past-order/:role", authenticateToken);

orderRouter.post("/", authenticateToken, createOrder);

orderRouter.put("/:orderId", authenticateToken, updateOrder);

orderRouter.put("/update-driver-location/:orderId", authenticateToken);

export default orderRouter;
