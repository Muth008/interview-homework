import { ajv, handleValidationError } from '../../utils/ajv.util';
import updateProductSchema from '../../schema/product/update.schema';
import { Request, Response } from 'express';
import { createError } from '../../utils/error.util';
import { convertStringsToNumbers } from '../../utils/common.util';
import { uploadFileMiddleware } from '../../middleware/file/upload.middleware';
import { productDAO } from '../../dao/daoInit';

const fileFolder = 'product';
const uploadFile = uploadFileMiddleware(fileFolder);

async function updateProduct(req: Request, res: Response) {
    try {
        await new Promise<void>((resolve, reject) => {
            uploadFile(req, res, async (err) => {
                try {
                    // Respond with an error message if file upload fails
                    if (err) return reject(err);

                    let body = req.body;

                    // Validate request body
                    const valid = ajv.validate(updateProductSchema, body);
                    if (!valid) return reject(handleValidationError(ajv));

                    // Convert string numbers from form data to actual numbers
                    const keys = ['id', 'quantity', 'price'];
                    convertStringsToNumbers(body, keys);

                    if (req.file) {
                        // Update the body with uploaded file path
                        body.imageUrl = `/api/${fileFolder}/uploads/${req.file.originalname}`;
                    }

                    const product = await productDAO.updateProduct(body);
                    res.json(product);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? { ...err } : { ...createError('Update', 'product') });
    }
}

export default updateProduct;
