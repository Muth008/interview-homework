import ProductDAO from "../../dao/product.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import updateProductSchema from "../../schema/product/update.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

async function updateProduct(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateProductSchema, body);
        if (!valid) handleValidationError(ajv);

        const product = await productDAO.updateProduct(body);
        res.json(product);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Update', 'product')});
    }
}

export default updateProduct;
