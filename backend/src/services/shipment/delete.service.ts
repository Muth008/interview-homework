import ShipmentDAO from "../../dao/shipment.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import deleteShipmentSchema from "../../schema/shipment/delete.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";
import { handleProductsQuantities } from "../../utils/product.util";

const prisma = new PrismaClient();
const shipmentDAO = new ShipmentDAO(prisma);

async function deleteShipment(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteShipmentSchema, body);
        if (!valid) handleValidationError(ajv);

        handleProductsQuantities(body.id, body.products)

        const shipment = await shipmentDAO.deleteShipment(Number(body.id));
        res.json(shipment);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Delete', 'shipment')});
    }
}

export default deleteShipment;
