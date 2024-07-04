import ProductDAO from '../../dao/product.dao';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ajv, handleValidationError } from '../../utils/ajv.util';
import { createError, handleUploadError } from '../../utils/error.util';
import createProductSchema from '../../schema/product/create.schema';
import { uploadFileMiddleware } from '../../middleware/file/upload.middleware';
import { convertStringsToNumbers } from '../../utils/request.util';

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

const fileFolder = 'product';
const uploadFile = uploadFileMiddleware(fileFolder);

async function createProduct(req: Request, res: Response) {
    try {
        await new Promise<void>((resolve, reject) => {
            uploadFile(req, res, async (err) => {
                try {
                    // Respond with an error message if file upload fails
                    if (err) return reject(err);

                    let body = req.body;

                    // Validate request body
                    const valid = ajv.validate(createProductSchema, body);
                    if (!valid) return reject(handleValidationError(ajv));

                    // Convert string numbers from form data to actual numbers
                    const keys = ['quantity', 'price'];
                    convertStringsToNumbers(body, keys)

                    if (req.file) {
                        // Update the body with uploaded file path
                        body.imageUrl = `/api/${fileFolder}/uploads/${req.file.originalname}`;
                    }

                    const product = await productDAO.createProduct(body);
                    res.json(product);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? { ...err } : { ...createError('Create', 'product') });
    }
}

export default createProduct;
