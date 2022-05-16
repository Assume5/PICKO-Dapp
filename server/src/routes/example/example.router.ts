import { Router } from "express";
import {
    authenticateToken,
    regenerateAccessToken,
} from "../../middleware/auth.middleware";
import {
    deleteExample,
    getExample,
    login,
    logout,
    postExample,
    putExample,
} from "./example.controller";

const exampleRouter = Router();

exampleRouter.get("/", authenticateToken, regenerateAccessToken, getExample);

exampleRouter.post("/", postExample);

exampleRouter.put("/:id", putExample);

exampleRouter.delete("/:id", deleteExample);

//JWT Example

exampleRouter.post("/login", login);

exampleRouter.post("/logout", logout);

export default exampleRouter;
