import { Router } from "express";
import checkLoginRouter from "./checkLogin/checkLogin.router";
//routers
import exampleRouter from "./example/example.router";
import generateGuestToken from "./generateGuestToken/generateGuestToken.model";
import loginRouter from "./login/login.route";
import registerRouter from "./register/register.router";

const api = Router();

api.use("/example", exampleRouter);

api.use("/generate-guest-token", generateGuestToken);

api.use("/register", registerRouter);

api.use("/login", loginRouter);

api.use("/check-login", checkLoginRouter);

export default api;
