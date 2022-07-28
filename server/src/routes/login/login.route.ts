import { Router } from "express";
import {
    loginCustomer,
    loginOwner,
    createGuest,
    loginDriver,
} from "./login.controller";

const loginRouter = Router();

loginRouter.post("/customer", loginCustomer);
loginRouter.post("/guest", createGuest);

loginRouter.post("/owner", loginOwner);

loginRouter.post("/driver", loginDriver);

export default loginRouter;
