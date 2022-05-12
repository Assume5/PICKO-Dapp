import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import api from "./routes";

const app = express();
const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:3000";

//middleware
app.use(helmet());
app.use(
    cors({
        origin: allowOrigin,
    })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(api);

app.get("/", (req, res) => {
    res.status(200).send("PICKO-DAPP Server 1  3 2  123  1 1");
});

const delay = (duration: number) => {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
        //event loop is blocked...
    }
};

app.get("/timer", (req, res) => {
    delay(5000);
    res.status(200).send(`${process.pid}`);
});

export default app;
