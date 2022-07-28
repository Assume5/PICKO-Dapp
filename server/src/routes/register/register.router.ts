import { Router } from "express";
import {
    registerCustomer,
    registerDriver,
    registerOwner,
} from "./register.controller";

const registerRouter = Router();

registerRouter.post("/customer", registerCustomer);

registerRouter.post("/owner", registerOwner);

registerRouter.post("/driver", registerDriver);

export default registerRouter;
