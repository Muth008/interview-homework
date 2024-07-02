import StatusDAO from '../../dao/status.dao';
import { PrismaClient } from '@prisma/client';
import { ajv, handleValidationError } from '../../utils/ajv.util';
import { createError } from '../../utils/error.util';
import createStatusSchema from '../../schema/status/create.schema';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const statusDAO = new StatusDAO(prisma);

async function createStatus(req: Request, res: Response) {
  try {
    const body = req.body;

    // Validate request body
    const valid = ajv.validate(createStatusSchema, body);
    if (!valid) handleValidationError(ajv);

    const status = await statusDAO.createStatus(body);
    res.json(status);
  } catch (err: any) {
    res.status(err.status ?? 500).json(err.status ? { ...err } : { ...createError('Create', 'status') });
  }
}

export default createStatus;