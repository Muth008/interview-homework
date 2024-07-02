import ProductDAO from '../../dao/product.dao';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ajv, handleValidationError } from '../../utils/ajv.util';
import { createError, handleUploadError } from '../../utils/error.util';
import createProductSchema from '../../schema/product/create.schema';
import { uploadFileMiddleware } from '../../middleware/file/upload.middleware';

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

const fileFolder = 'product';
const uploadFile = uploadFileMiddleware(fileFolder);

async function createProduct(req: Request, res: Response) {
    try {
        uploadFile(req, res, async (err) => {
            // Respond with an error message if file upload fails
            if (err) return handleUploadError(err, res);

            let body = req.body;

            // Validate request body
            const valid = ajv.validate(createProductSchema, body);
            if (!valid) handleValidationError(ajv);

            if (req.file) {
                // Update the body with uploaded file path
                body.imageUrl = `/${fileFolder}/uploads/${req.file.originalname}`;
            }

            const product = await productDAO.createProduct(body);
            res.json(product);
        });
    } catch (err: any) {
        res.status(err.status ?? 500)
        .json(err.status ? { ...err } : { ...createError('Create', 'product') });
    }
}

export default createProduct;
