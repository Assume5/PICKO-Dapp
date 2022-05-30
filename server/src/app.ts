import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import api from "./routes";
import cookieParser from "cookie-parser";
import { Prisma, PrismaClient } from "@prisma/client";

require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:3000";

//middleware
app.use(helmet());
app.use(
    cors({
        origin: allowOrigin,
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(api);

app.get("/", (req, res) => {
    res.status(200).send("PICKO-DAPP Server");
});

export default app;
