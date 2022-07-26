import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    name: string;
    userId: string;
    role: string;
}

export interface UserAuthInfo extends Request {
    user: CustomJwtPayload;
    accessToken: string;
    refreshToken: string;
}
