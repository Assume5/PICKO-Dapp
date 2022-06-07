import { Response } from "express";
import { CustomJwtPayload, UserAuthInfo } from "../../types/interface";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    sameSite,
    secure,
} from "../../utils/constant";
import { checkRestaurantExists } from "../../models/check.model";

export const checkLogin = (req: UserAuthInfo, res: Response) => {
    const accessToken = req.cookies["access_token"];
    if (!accessToken) {
        return res.status(200).json({ success: false });
    }

    verify(
        accessToken,
        ACCESS_TOKEN_SECRET,
        (err: VerifyErrors, user: CustomJwtPayload) => {
            if (err && err.name === "TokenExpiredError") {
                const refreshToken = req.cookies["refresh_token"];
                if (!refreshToken) {
                    res.clearCookie("access_token", {
                        httpOnly: true,
                        sameSite: sameSite,
                        secure: secure,
                    });
                    res.clearCookie("refresh_token", {
                        httpOnly: true,
                        sameSite: sameSite,
                        secure: secure,
                    });
                    return res.status(200).json({ success: false });
                }

                verify(
                    refreshToken,
                    REFRESH_TOKEN_SECRET,
                    (err: VerifyErrors, user: CustomJwtPayload) => {
                        if (err && err.name === "TokenExpiredError") {
                            res.clearCookie("access_token", {
                                httpOnly: true,
                                sameSite: sameSite,
                                secure: secure,
                            });
                            res.clearCookie("refresh_token", {
                                httpOnly: true,
                                sameSite: sameSite,
                                secure: secure,
                            });
                            return res.status(200).json({ success: false });
                        }

                        const accessToken = sign(
                            {
                                userId: user.userId,
                                name: user.name,
                                role: user.role,
                            },
                            ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: "20m",
                            }
                        );
                        res.cookie("access_token", accessToken, {
                            httpOnly: true,
                            sameSite: sameSite,
                            secure: secure,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });
                        return res.status(200).json({
                            success: true,
                            name: user.name,
                            role: user.role,
                        });
                    }
                );
            }

            return res
                .status(200)
                .json({ success: true, name: user.name, role: user.role });
        }
    );
};

export const checkRestaurant = async (req: UserAuthInfo, res: Response) => {
    const result = await checkRestaurantExists(req.user.userId);
    
    if (result) {
        return res.status(200).json({ exists: true, id: result.id });
    }

    return res.status(200).json({ exists: false });
};
