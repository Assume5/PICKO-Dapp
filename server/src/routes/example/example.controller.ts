import { Response, Request } from "express";
import {
    getExampleDB,
    postExampleDB,
    updateExampleDB,
    deleteExampleDB,
    findRow,
} from "../../models/example.model";

export const getExample = async (req: Request, res: Response) => {
    return res.status(200).json(await getExampleDB());
};

export const postExample = async (req: Request, res: Response) => {
    const { fname, lname } = req.body;

    if (!fname || !lname) {
        return res.status(400).json({ error: "Missing body" });
    }

    await postExampleDB(fname, lname);
    return res.status(200).json(req.body);
};

export const putExample = async (req: Request, res: Response) => {
    const { fname, lname } = req.body;
    if (!fname || !lname) {
        return res.status(400).json({ error: "Missing body" });
    }

    if (!(await findRow(+req.params.id))) {
        return res.status(404).json({ error: "ID Not Found" });
    }

    await updateExampleDB(+req.params.id, fname, lname);
    return res.status(200).json(req.body);
};

export const deleteExample = async (req: Request, res: Response) => {
    if (!(await findRow(+req.params.id))) {
        return res.status(404).json({ error: "ID Not Found" });
    }

    await deleteExampleDB(+req.params.id);
    return res.status(200).json({ ok: true });
};
