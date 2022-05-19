import { Router } from "express";
import { registerCustomer, registerOwner } from "./register.controller";

const registerRouter = Router();

registerRouter.post("/customer", registerCustomer);

registerRouter.post("/owner", registerOwner);

registerRouter.post("/driver");

export default registerRouter;
