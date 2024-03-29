import { Response, Request } from "express";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import {
    getExampleDB,
    postExampleDB,
    updateExampleDB,
    deleteExampleDB,
    findRow,
} from "../../models/example.model";
import { getImage } from "../../services/s3";
import { CustomJwtPayload, UserAuthInfo } from "../../types/interface";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    sameSite,
    secure,
} from "../../utils/constant";

export const getExample = async (req: UserAuthInfo, res: Response) => {
    return res.status(200).json(await getExampleDB());
};

export const postExample = async (req: Request, res: Response) => {
    const { fname, lname } = req.body;

    if (!fname || !lname) {
        return res.status(400).json({ error: "Missing body" });
    }

    await postExampleDB(fname, lname);
    return res.status(200).json(req.body);
};

export const putExample = async (req: Request, res: Response) => {
    const { fname, lname } = req.body;
    if (!fname || !lname) {
        return res.status(400).json({ error: "Missing body" });
    }

    if (!(await findRow(+req.params.id))) {
        return res.status(404).json({ error: "ID Not Found" });
    }

    await updateExampleDB(+req.params.id, fname, lname);
    return res.status(200).json(req.body);
};

export const deleteExample = async (req: Request, res: Response) => {
    if (!(await findRow(+req.params.id))) {
        return res.status(404).json({ error: "ID Not Found" });
    }

    await deleteExampleDB(+req.params.id);
    return res.status(200).json({ ok: true });
};

//JWT Example

const generateAccessToken = (user: any) => {
    return sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: "20m",
    });
};

export const login = (req: Request, res: Response) => {
    const username = req.body.username;

    if (username !== "test user") {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = { name: username };
    const accessToken = generateAccessToken(user);
    const refreshToken = sign(user, REFRESH_TOKEN_SECRET);

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: sameSite,
        secure: secure,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: sameSite,
        secure: secure,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ ok: true });
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        sameSite: sameSite,
        secure: secure,
    });
    res.clearCookie("refresh_token", {
        sameSite: sameSite,
        secure: secure,
    });
    res.status(200).json({ ok: true });
};

export const getExampleImageFromS3 = async (req: Request, res: Response) => {
    const key = req.params.key;
    const result = await getImage(key);
    return res.status(200).send(result);
};
