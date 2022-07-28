import { Response, NextFunction } from "express";
import { CustomJwtPayload, UserAuthInfo } from "../types/interface";

import { sign, verify, VerifyErrors } from "jsonwebtoken";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    sameSite,
    secure,
} from "../utils/constant";
import { checkRestaurantExists } from "../models/check.model";

export const authenticateToken = (
    req: UserAuthInfo,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies["access_token"];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized token" });
    }

    verify(
        token,
        ACCESS_TOKEN_SECRET,
        (err: VerifyErrors, user: CustomJwtPayload) => {
            //check if access token expire
            if (err && err.name === "TokenExpiredError") {
                const refresh_token = req.cookies["refresh_token"];
                if (!refresh_token) {
                    res.clearCookie("access_token", {
                        sameSite: sameSite,
                        secure: secure,
                    });
                    res.clearCookie("refresh_token", {
                        sameSite: sameSite,
                        secure: secure,
                    });
                    return res
                        .status(401)
                        .json({ error: "Unauthorized token" });
                }
                //if expire generate new access token
                verify(
                    refresh_token,
                    REFRESH_TOKEN_SECRET,
                    (err: VerifyErrors, user: CustomJwtPayload) => {
                        if (err) {
                            res.clearCookie("access_token", {
                                sameSite: sameSite,
                                secure: secure,
                            });
                            res.clearCookie("refresh_token", {
                                sameSite: sameSite,
                                secure: secure,
                            });
                            return res.send({ error: "Token expires" });
                        }
                        const access_token = sign(
                            {
                                userId: user.userId,
                                role: user.role,
                            },
                            ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: "15s",
                            }
                        );
                        req.accessToken = access_token;
                        req.user = user;
                        next();
                    }
                );
            } else if (err) {
                res.clearCookie("access_token", {
                    sameSite: sameSite,
                    secure: secure,
                });
                res.clearCookie("refresh_token", {
                    sameSite: sameSite,
                    secure: secure,
                });
                return res.status(403).json({ error: "Invalid token" });
            } else {
                req.user = user;
                next();
            }
        }
    );
};

//check if need to regenerate access token
export const regenerateAccessToken = (
    req: UserAuthInfo,
    res: Response,
    next: NextFunction
) => {
    if (req.accessToken) {
        res.cookie("access_token", req.accessToken, {
            httpOnly: true,
            sameSite: sameSite,
            secure: secure,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    next();
};

export const authenticateOwner = async (
    req: UserAuthInfo,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    if (req.user.role !== "owner") {
        return res.status(403).json({ success: false, error: "unauthorized" });
    }

    const getRestaurantId = await checkRestaurantExists(req.user.userId);

    if (!getRestaurantId) {
        return res.status(403).json({ success: false, error: "unauthorized" });
    }

    if (id && id !== getRestaurantId.id) {
        return res.status(403).json({ success: false, error: "unauthorized" });
    }

    next();
};
