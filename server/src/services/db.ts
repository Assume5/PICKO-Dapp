import { Pool } from "pg";
require("dotenv").config();

const dbConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: +process.env.DATABASE_PORT,
};

const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
});

pool.on("connect", () => {
    console.log("Connected a client to the database");
});

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

export default pool;
