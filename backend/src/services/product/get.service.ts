import ProductDAO from "../../dao/product.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import getProductSchema from "../../schema/product/get.schema";
import { createError, handleNotFound } from "../../utils/error.util";
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

async function getProduct(req: Request, res: Response) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getProductSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const product = await productDAO.getProductById(Number(reqParams.id));

        if (!product) handleNotFound('product', reqParams.id);

        res.json(product);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Get', 'product') });
    }
}

export default getProduct;
