import pool from "../services/db";

export const findRow = async (id: number) => {
    return (
        (await (
            await pool.query(`SELECT * FROM test WHERE "ID"=${id};`)
        ).rowCount) > 0
    );
};

export const getExampleDB = async () => {
    try {
        const response = await pool.query(`SELECT * FROM test;`);
        return response.rows;
    } catch (err) {
        return err;
    }
};

export const postExampleDB = async (fname: string, lname: string) => {
    await pool
        .query(
            `INSERT INTO test (fname,lname) VALUES ('${fname}', '${lname}');`
        )
        .catch((err) => {
            console.log(`Insert to example fail: ${err}`);
        });
};

export const updateExampleDB = async (
    ID: number,
    fname: string,
    lname: string
) => {
    await pool
        .query(
            `UPDATE test SET fname = '${fname}', lname = '${lname}' WHERE "ID" = ${ID}`
        )
        .catch((err) => {
            console.log(`Update to example fail: ${err}`);
        });
};

export const deleteExampleDB = async (ID: number) => {
    await pool.query(`DELETE FROM test WHERE "ID" = ${ID}`).catch((err) => {
        console.log(`Delete to example fail: ${err}`);
    });
};
