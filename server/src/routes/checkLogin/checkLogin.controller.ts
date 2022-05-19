import { Response } from "express";
import { CustomJwtPayload, UserAuthInfo } from "../../types/interface";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    sameSite,
    secure,
} from "../../utils/constant";

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
                        });
                        return res
                            .status(200)
                            .json({ success: true, role: user.role });
                    }
                );
            }
            return res.status(200).json({ success: true, role: user.role });
        }
    );
};
