import { Pool } from "pg";
require("dotenv").config();
import { Prisma, PrismaClient } from "@prisma/client";

const isProd = process.env.NODE_ENV === "production";

const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

let pool: Pool;

if (isProd) {
    pool = new Pool({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    pool = new Pool({
        connectionString: connectionString,
    });
}

pool.on("connect", () => {
    console.log("Connected a client to the database");
});

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

export const prisma = new PrismaClient();

export default pool;
