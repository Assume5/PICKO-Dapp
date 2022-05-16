import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../utils/constant";

export const signGuestToken = (req: Request, res: Response) => {
    const random = randomBytes(10).toString("hex");

    const accessToken = sign({ randomString: random }, ACCESS_TOKEN_SECRET);
    return res.status(201).json(accessToken);
};
