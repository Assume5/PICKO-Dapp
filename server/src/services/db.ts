import { Pool } from "pg";
require("dotenv").config();

const dbConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: +process.env.DATABASE_PORT,
};

const isProd = process.env.NODE_ENV === "production";

const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

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

export default pool;
