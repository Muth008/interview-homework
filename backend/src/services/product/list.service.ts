import ProductDAO from "../../dao/product.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import listProductSchema from "../../schema/product/list.schema";
import { createError } from "../../utils/error.util";
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

async function listProducts(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listProductSchema, body);
        if (!valid) handleValidationError(ajv);

        const products = await productDAO.listProducts(body);
        res.json(products);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('List', 'product') });
    }
}

export default listProducts;
