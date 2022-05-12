import { Router } from "express";
//routers
import exampleRouter from "./example/example.router";

const api = Router();

api.use("/example", exampleRouter);

export default api;
