import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    name: string;
}

export interface UserAuthInfo extends Request {
    user: CustomJwtPayload;
    accessToken: string;
}
