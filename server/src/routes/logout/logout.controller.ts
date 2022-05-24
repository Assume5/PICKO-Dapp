import { Request, Response } from "express";
import { sameSite, secure } from "../../utils/constant";

export const logout = (req: Request, res: Response) => {
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
