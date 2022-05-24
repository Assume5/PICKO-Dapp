import { Router } from "express";
//routers
import exampleRouter from "./example/example.router";
import generateGuestToken from "./generateGuestToken/generateGuestToken.model";
import loginRouter from "./login/login.route";
import registerRouter from "./register/register.router";
import checkRouter from "./check/check.router";
import logoutRouter from "./logout/logout.router";
import restaurantRouter from "./restaurant/restaurant.router";

const api = Router();

api.use("/example", exampleRouter);

api.use("/generate-guest-token", generateGuestToken);

api.use("/register", registerRouter);

api.use("/login", loginRouter);

api.use("/check", checkRouter);

api.use("/logout", logoutRouter);

api.use("/restaurant", restaurantRouter);

export default api;
