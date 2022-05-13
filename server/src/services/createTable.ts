import pool from "./db";

const createExample = `
CREATE TABLE IF NOT EXISTS test
(
    "ID" serial,
    fname character varying(255),
    lname character varying(255),
    PRIMARY KEY ("ID")
);
`;

const createSocketSession = `
CREATE TABLE IF NOT EXISTS socket_session
(
    socket_id character varying(255)
);
`;

export const createDatabaseTable = async () => {
    await pool.query(createExample).catch((err) => {
        console.log("Error on creating example table: ", err);
    });

    await pool.query(createSocketSession).catch((err) => {
        console.log("Error on creating socket_session table: ", err);
    }); 
};
