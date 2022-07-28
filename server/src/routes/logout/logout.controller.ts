import { Request, Response } from "express";
import { updateDriverStatusDB } from "../../models/user.modal";
import { UserAuthInfo } from "../../types/interface";
import { sameSite, secure } from "../../utils/constant";

export const logout = async (req: UserAuthInfo, res: Response) => {
    if (req.user && req.user.userId && req.user.role === "driver") {
        updateDriverStatusDB(req.user.userId, "0");
    }
    
    res.clearCookie("access_token", {
        sameSite: sameSite,
        secure: secure,
    });
    res.clearCookie("refresh_token", {
        sameSite: sameSite,
        secure: secure,
    });
    res.status(200).json({ success: true });
};
