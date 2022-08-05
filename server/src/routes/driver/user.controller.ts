import { UserAuthInfo } from "../../types/interface";
import { Response } from "express";
import {
    getCustomerSocketCookieBaseOnOrderID,
    getDriverCurrentOrder,
    updateDriverLocationDB,
    updateDriverStatusDB,
} from "../../models/user.modal";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";

export const updateDriverStatus = async (req: UserAuthInfo, res: Response) => {
    const { status } = req.body;
    if (!req.user) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    if (!status) {
        return res
            .status(401)
            .json({ success: false, error: "Missing Status" });
    }

    try {
        await updateDriverStatusDB(req.user.userId, status);
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
export const updateDriverLocation = async (
    req: UserAuthInfo,
    res: Response
) => {
    const { lat, long } = req.body;
    // console.log(req.app.get("socket"));

    if (!req.user) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    if (!lat || !long) {
        return res
            .status(401)
            .json({ success: false, error: "Missing Lat or Long" });
    }

    try {
        await updateDriverLocationDB(req.user.userId, lat, long);
        const currentOrder = await getDriverCurrentOrder(req.user.userId);
        console.log(currentOrder);
        if (currentOrder) {
            const socket: Server<
                DefaultEventsMap,
                DefaultEventsMap,
                DefaultEventsMap,
                any
            > = req.app.get("socket");
            const customerCookie = await getCustomerSocketCookieBaseOnOrderID(
                currentOrder
            );
            socket
                .to(customerCookie.customer.socket_cookie)
                .emit("update-location", {
                    id: currentOrder,
                    driverLat: lat,
                    driverLong: long,
                });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
