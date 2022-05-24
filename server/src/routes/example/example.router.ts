import { Router } from "express";
import {
    authenticateToken,
    regenerateAccessToken,
} from "../../middleware/auth.middleware";
import {
    deleteExample,
    getExample,
    getExampleImageFromS3,
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

exampleRouter.get("/image/:key", getExampleImageFromS3);

//JWT Example

exampleRouter.post("/login", login);

exampleRouter.post("/logout", logout);

export default exampleRouter;
