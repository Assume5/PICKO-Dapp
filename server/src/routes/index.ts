import { Router } from "express";
//routers
import exampleRouter from "./example/example.router";
import generateGuestToken from "./generateGuestToken/generateGuestToken.model";

const api = Router();

api.use("/example", exampleRouter);

api.use("/generate-guest-token", generateGuestToken);

export default api;
