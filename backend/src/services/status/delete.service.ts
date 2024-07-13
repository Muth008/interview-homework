import { ajv, handleValidationError } from "../../utils/ajv.util";
import deleteStatusSchema from "../../schema/status/delete.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";
import { convertStringsToNumbers } from "../../utils/common.util";
import { statusDAO } from "../../dao/daoInit";

async function deleteStatus(req: Request, res: Response) {
    try {
        const query = req.query;

        // Validate request body
        const valid = ajv.validate(deleteStatusSchema, query);
        if (!valid) handleValidationError(ajv);

        // Convert string number to actual number
        convertStringsToNumbers(query, ['id'])

        const status = await statusDAO.deleteStatus(Number(query.id));
        res.json(status);
    } catch (err: any) {
        console.log(err);
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Delete', 'status')});
    }
}

export default deleteStatus;
