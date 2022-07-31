import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import api from "./routes";
import cookieParser from "cookie-parser";
import { Prisma, PrismaClient } from "@prisma/client";
import path from "path";
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:3000";

//middleware
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
);
app.use(
    cors({
        origin: [allowOrigin, "http://192.168.1.22:3000"],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(api);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("*", (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "..", "public", "index.html")
    );
});

export default app;
