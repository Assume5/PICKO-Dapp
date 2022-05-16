import { Response, Request } from "express";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import {
    getExampleDB,
    postExampleDB,
    updateExampleDB,
    deleteExampleDB,
    findRow,
} from "../../models/example.model";
import { CustomJwtPayload, UserAuthInfo } from "../../types/interface";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
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
let refreshTokens: string[] = []; //should store in db

const generateAccessToken = (user: any) => {
    return sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
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

    refreshTokens.push(refreshToken);
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    return res.status(200).json({ ok: true });
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({ ok: true });
};
