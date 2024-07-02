import StatusDAO from "../../dao/status.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import deleteStatusSchema from "../../schema/status/delete.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";

const prisma = new PrismaClient();
const statusDAO = new StatusDAO(prisma);

async function deleteStatus(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteStatusSchema, body);
        if (!valid) handleValidationError(ajv);

        const status = await statusDAO.deleteStatus(Number(body.id));
        res.json(status);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Delete', 'status')});
    }
}

export default deleteStatus;
