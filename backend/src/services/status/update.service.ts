import StatusDAO from "../../dao/status.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import updateStatusSchema from "../../schema/status/update.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";

const prisma = new PrismaClient();
const statusDAO = new StatusDAO(prisma);

async function updateStatus(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateStatusSchema, body);
        if (!valid) handleValidationError(ajv);

        const status = await statusDAO.updateStatus(body);
        res.json(status);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Update', 'status')});
    }
}

export default updateStatus;
