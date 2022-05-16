import { Router } from "express";
import { signGuestToken } from "./generateGuestToken.controller";

const generateGuestToken = Router();

generateGuestToken.post("/", signGuestToken);

export default generateGuestToken;
