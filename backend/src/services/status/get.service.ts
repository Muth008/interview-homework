import { ajv, handleValidationError } from "../../utils/ajv.util";
import getStatusSchema from "../../schema/status/get.schema";
import { createError, handleNotFound } from "../../utils/error.util";
import { Request, Response } from 'express';
import { statusDAO } from "../../dao/daoInit";

async function getStatus(req: Request, res: Response) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getStatusSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const status = await statusDAO.getStatusById(Number(reqParams.id));

        if (!status) handleNotFound('status', reqParams.id);

        res.json(status);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Get', 'status')});
    }
}

export default getStatus;
