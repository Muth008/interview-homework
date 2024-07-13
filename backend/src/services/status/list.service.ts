import { ajv, handleValidationError } from "../../utils/ajv.util";
import listStatusSchema from "../../schema/status/list.schema";
import { createError } from "../../utils/error.util";
import { Request, Response } from 'express';
import { statusDAO } from "../../dao/daoInit";

async function listStatus(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listStatusSchema, body);
        if (!valid) handleValidationError(ajv);

        const status = await statusDAO.listStatuses(body);
        res.json(status);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('List', 'status') });
    }
}

export default listStatus;
