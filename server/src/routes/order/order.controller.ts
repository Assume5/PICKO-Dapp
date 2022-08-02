import { UserAuthInfo } from "../../types/interface";
import { Response } from "express";
import { order } from "../../types";
import {
    createOrderDB,
    getOrderCustomerDB,
    getOrderDetailsDB,
    getOrderOwnerDB,
} from "../../models/order.modal";
import { getImage } from "../../services/s3";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const createOrder = async (req: UserAuthInfo, res: Response) => {
    const { userId } = req.user;
    const order: order = req.body;
    order.customer_id = userId;
    try {
        await createOrderDB(order);
        return res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const getOrder = async (req: UserAuthInfo, res: Response) => {
    const { userId } = req.user;
    const { role } = req.params;
    if (!userId || !role) {
        return res
            .status(401)
            .json({ success: false, error: "Missing Property" });
    }

    try {
        if (role === "customer") {
            const data = await getOrderCustomerDB(userId);
            const orders = data.orders;
            for (let i = 0; i < orders.length; i++) {
                orders[i].restaurant.restaurant_card_image = await getImage(
                    orders[i].restaurant.restaurant_card_image
                );
            }
            return res.status(200).json({ success: true, data: orders });
        }

        if (role === "owner") {
            const data = await getOrderOwnerDB(userId);
            return res
                .status(200)
                .json({ success: true, data: data.restaurants[0].orders });
        }
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const getOrderDetails = async (req: UserAuthInfo, res: Response) => {
    const { userId } = req.user;
    const { orderID } = req.params;

    if (!userId || !orderID) {
        return res
            .status(401)
            .json({ success: false, error: "Missing Property" });
    }

    try {
        const data = await getOrderDetailsDB(orderID);
        return res.status(200).json({ success: true, data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

export const updateOrder = async (req: UserAuthInfo, res: Response) => {
    console.log(req.body);
    console.log(req.params);

    const socket: Server<
        DefaultEventsMap,
        DefaultEventsMap,
        DefaultEventsMap,
        any
    > = req.app.get("socket");
    socket
        .to("6b8f66dc-48bc-4aca-90c0-f5c7212a9178")
        .emit("update-order-details", req.body);

    socket
        .to([
            "193882ab-6b95-4230-b42a-71022a7ab5d3",
            "024d8c6c-d8ad-43d8-8b39-ccc31e8fb6e5",
        ])
        .emit("driver-new-order", req.body);

    return res.status(200).json({ success: true });
};
