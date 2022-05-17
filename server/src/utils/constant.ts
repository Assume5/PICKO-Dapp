require("dotenv").config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const sameSite = process.env.NODE_ENV === "production" ? "none" : "lax";
export const secure = process.env.NODE_ENV === "production" ? true : false;
