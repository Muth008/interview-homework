import { ajv, handleValidationError } from "../../utils/ajv.util";
import listShipmentSchema from "../../schema/shipment/list.schema";
import { createError } from "../../utils/error.util";
import { Request, Response } from 'express';
import { shipmentDAO } from "../../dao/daoInit";

async function listShipments(req: Request, res: Response) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listShipmentSchema, body);
        if (!valid) handleValidationError(ajv);

        const shipments = await shipmentDAO.listShipments(body);
        res.json(shipments);
    } catch (err: any) {
        res.status(err.status ?? 500).json(err.status ? {...err} :{ ...createError('List', 'shipment') });
    }
}

export default listShipments;
