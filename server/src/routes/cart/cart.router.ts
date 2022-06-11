import Router from "express";
import { authenticateToken } from "../../middleware/auth.middleware";

const cartRouter = Router();

cartRouter.get("/guest/:guestId");
cartRouter.get("/", authenticateToken);

cartRouter.post("/guest/:guestId");
cartRouter.post("/customer/:customerId", authenticateToken);

cartRouter.put("/guest/:guestId");
cartRouter.put("/", authenticateToken);

cartRouter.delete("/guest/:guestId");
cartRouter.delete("/", authenticateToken);
export default cartRouter;
