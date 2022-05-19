import { Router } from "express";
import { loginCustomer, loginOwner } from "./login.controller";

const loginRouter = Router();

loginRouter.post("/customer", loginCustomer);

loginRouter.post("/owner", loginOwner);

loginRouter.post("/driver");

export default loginRouter;
