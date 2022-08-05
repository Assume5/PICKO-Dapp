import { UserAuthInfo } from "../../types/interface";
import { Response } from "express";
import { order } from "../../types";
import {
    assignDriverOrder,
    clearDriverCurrentOrderDB,
    createOrderDB,
    getDriverCurrentOrderDetailsDB,
    getDriverOrderDB,
    getNearByDriverDB,
    getNearByOrderDB,
    getOrderCustomerDB,
    getOrderDetailsDB,
    getOrderOwnerDB,
    updateOrderStatusDB,
} from "../../models/order.modal";
import { getImage } from "../../services/s3";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getSocket } from "../../models/login.model";
import {
    getDriverCurrentOrder,
    getDriverStatus,
} from "../../models/user.modal";

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

        if (role === "driver") {
            const data = await getDriverOrderDB(userId);
            return res.status(200).json({ success: true, data: data.orders });
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
    const { status } = req.body;
    const { orderId } = req.params;

    if (!status || !orderId) {
        return res
            .status(401)
            .json({ success: false, error: "Missing Property" });
    }

    const socket: Server<
        DefaultEventsMap,
        DefaultEventsMap,
        DefaultEventsMap,
        any
    > = req.app.get("socket");

    try {
        if (status === "1" || status === "-1") {
            const data = await updateOrderStatusDB(orderId, status, null);
            const nearbyDriver = await getNearByDriverDB(
                data.restaurant_lat,
                data.restaurant_long
            );
            if (nearbyDriver.length) {
                const socketCookies: string[] = [];
                nearbyDriver.forEach((item) => {
                    socketCookies.push(item.socket_cookie);
                });
                if (status === "1") {
                    socket.to(socketCookies).emit("driver-new-order", data);
                }
            }

            socket
                .to(data.customer.socket_cookie)
                .emit("update-order-details", { id: orderId, status });
            return res.status(200).json({
                success: true,
                confirm_at: data.confirm_at,
                pickup_at: data.pickup_at,
                ready_at: data.ready_at,
                compelete_at: data.compelete_at,
            });
        } else if (status === "2") {
            const { userId } = req.user;
            const data = await updateOrderStatusDB(orderId, status, userId);
            await assignDriverOrder(userId, orderId);
            const ownerUpdateOrderArgs = {
                status,
                confirm_at: data.confirm_at,
                pickup_at: data.pickup_at,
                ready_at: data.ready_at,
                compelete_at: data.compelete_at,
            };
            const driverStatus = await getDriverStatus(userId);
            socket
                .to(data.restaurant.owner.socket_cookie)
                .emit("owner-order-update", ownerUpdateOrderArgs);
            socket
                .to(data.customer.socket_cookie)
                .emit("update-order-details", {
                    id: orderId,
                    status,
                    driverLat: driverStatus.lat,
                    driverLong: driverStatus.long,
                });
            socket.emit("driver-order-been-accepted", orderId);
            return res.status(200).json({
                success: true,
            });
        } else if (status === "3") {
            const { userId } = req.user;
            const data = await updateOrderStatusDB(orderId, status, null);
            const ownerUpdateOrderArgs = {
                id: orderId,
                status,
                confirm_at: data.confirm_at,
                pickup_at: data.pickup_at,
                ready_at: data.ready_at,
                compelete_at: data.compelete_at,
            };
            const driverStatus = await getDriverStatus(userId);
            socket
                .to(data.restaurant.owner.socket_cookie)
                .emit("owner-order-update", ownerUpdateOrderArgs);
            socket
                .to(data.customer.socket_cookie)
                .emit("update-order-details", {
                    id: orderId,
                    status,
                    driverLat: driverStatus.lat,
                    driverLong: driverStatus.long,
                });
            return res.status(200).json({
                success: true,
            });
        } else {
            const { userId } = req.user;
            const data = await updateOrderStatusDB(orderId, status, null);
            const ownerUpdateOrderArgs = {
                id: orderId,
                status,
                confirm_at: data.confirm_at,
                pickup_at: data.pickup_at,
                ready_at: data.ready_at,
                compelete_at: data.compelete_at,
            };
            const driverStatus = await getDriverStatus(userId);
            await clearDriverCurrentOrderDB(userId);
            socket
                .to(data.restaurant.owner.socket_cookie)
                .emit("owner-order-update", ownerUpdateOrderArgs);
            socket
                .to(data.customer.socket_cookie)
                .emit("update-order-details", {
                    id: orderId,
                    status,
                    driverLat: driverStatus.lat,
                    driverLong: driverStatus.long,
                });
            return res.status(200).json({
                success: true,
            });
        }
    } catch (err) {
        console.log(err);

        return res.status(500).json({ success: false, error: err });
    }
};

export const getNearByDriverOrder = async (
    req: UserAuthInfo,
    res: Response
) => {
    const { userId } = req.user;

    try {
        const status = await getDriverStatus(userId);
        const orders = await getNearByOrderDB(+status.lat, +status.long);
        return res.status(200).json({ success: true, data: orders });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};

export const driverCurrentOrder = async (req: UserAuthInfo, res: Response) => {
    const { userId } = req.user;
    try {
        const currentOrder = await getDriverCurrentOrder(userId);
        const data = await getDriverCurrentOrderDetailsDB(currentOrder);

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
