import ShipmentDAO from "../../dao/shipment.dao";
import { PrismaClient } from "@prisma/client";
import { ajv, handleValidationError } from "../../utils/ajv.util";
import updateShipmentSchema from "../../schema/shipment/update.schema";
import { Request, Response } from 'express';
import { createError } from "../../utils/error.util";
import { handleProductsQuantities } from "../../utils/product.util";

const prisma = new PrismaClient();
const shipmentDAO = new ShipmentDAO(prisma);

async function updateShipment(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateShipmentSchema, body);
        if (!valid) handleValidationError(ajv);

        handleProductsQuantities(body.id, body.products)

        body.shipmentDate = new Date(body.shipmentDate);

        // Update Shipment
        const shipment = await shipmentDAO.updateShipment(body);

        res.json(shipment);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('Update', 'shipment')});
    }
}


export default updateShipment;