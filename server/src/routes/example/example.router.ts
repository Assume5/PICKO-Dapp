import { Router } from "express";
import {
    deleteExample,
    getExample,
    postExample,
    putExample,
} from "./example.controller";

const exampleRouter = Router();

exampleRouter.get("/", getExample);

exampleRouter.post("/", postExample);

exampleRouter.put("/:id", putExample);

exampleRouter.delete("/:id", deleteExample);

export default exampleRouter;
