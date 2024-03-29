import { Router } from "express";
//routers
import exampleRouter from "./example/example.router";
import generateGuestToken from "./generateGuestToken/generateGuestToken.model";
import loginRouter from "./login/login.route";
import registerRouter from "./register/register.router";
import checkRouter from "./check/check.router";
import logoutRouter from "./logout/logout.router";
import restaurantRouter from "./restaurant/restaurant.router";
import restaurantSettingRouter from "./restaurant-settings/restaurant-settings.router";
import restaurantMenuCategorySettingsRouter from "./restaurant-category-settings/restaurant-category-setting.router";
import restaurantMenuSettingRouter from "./restaurant-menu-settings/restaurant-menu-settings.router";
import restaurantImagesSettingRouter from "./restaurant-images-settings/restaurant-images-settings.router";
import storeRouter from "./store/store.router";
import cartRouter from "./cart/cart.router";
import menuRouter from "./menu/menu.router";
import orderRouter from "./order/order.router";
import userRouter from "./driver/user.router";

const api = Router();

api.use("/example", exampleRouter);

api.use("/generate-guest-token", generateGuestToken);

api.use("/register", registerRouter);

api.use("/login", loginRouter);

api.use("/check", checkRouter);

api.use("/logout", logoutRouter);

api.use("/cart", cartRouter);

api.use("/menus", menuRouter);

api.use("/order", orderRouter);

api.use("/store", storeRouter);

api.use("/user", userRouter);

api.use("/restaurant", restaurantRouter);
api.use("/restaurant", restaurantSettingRouter);
api.use("/restaurant", restaurantMenuCategorySettingsRouter);
api.use("/restaurant", restaurantMenuSettingRouter);
api.use("/restaurant", restaurantImagesSettingRouter);

export default api;
