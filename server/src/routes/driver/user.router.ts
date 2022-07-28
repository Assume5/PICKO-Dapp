import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import { updateDriverStatus, updateDriverLocation } from "./user.controller";

const userRouter = Router();

//get user information
userRouter.get("/customer", authenticateToken);
userRouter.get("/owner", authenticateToken);
userRouter.get("/driver", authenticateToken);

//update driver status
userRouter.put("/driver/status", authenticateToken, updateDriverStatus);
userRouter.put(
    "/driver/update-location",
    authenticateToken,
    updateDriverLocation
);

export default userRouter;
