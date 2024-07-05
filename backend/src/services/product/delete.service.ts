import ProductDAO from "../../dao/product.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import deleteProductSchema from "../../schema/product/delete.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";
import { convertStringsToNumbers } from "../../utils/common.util";

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

async function deleteProduct(req: Request, res: Response) {
    try {
        const query = req.query;

        // Validate request query
        const valid = ajv.validate(deleteProductSchema, query);
        if (!valid) handleValidationError(ajv);

        // Convert string number to actual number
        convertStringsToNumbers(query, ['id'])

        const product = await productDAO.deleteProduct(Number(query.id));
        res.json(product);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Delete', 'product')});
    }
}

export default deleteProduct;
