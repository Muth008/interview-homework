import ProductDAO from "../../dao/product.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import deleteProductSchema from "../../schema/product/delete.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

async function deleteProduct(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteProductSchema, body);
        if (!valid) handleValidationError(ajv);

        const product = await productDAO.deleteProduct(Number(body.id));
        res.json(product);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Delete', 'product')});
    }
}

export default deleteProduct;
